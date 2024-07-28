package com.collegeproject.dealsforyou.customer;

import com.collegeproject.dealsforyou.product.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerService {

    private CustomerDao customerDao;

    @Autowired
    private CustomerRepository customerRepository;

    public CustomerService(@Qualifier("postgres") CustomerDao customerDao) {

        this.customerDao = customerDao;
    }

    public int addCustomer(Customer customer) {
        return customerDao.insertCustomer(customer);
    }

    public Customer findCustomerByEmail(String email) {
        return customerRepository.findCustomerByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("No User with that email was found"));}

    public List<Customer> findAllCustomers() {
        return customerDao.getAllCustomers();
    }

    public UUID findIdByEmail(String email) {
        return customerDao.getIdFromEmail(email);
    }

    public Optional<Customer> findCustomerById(UUID id) {
        return customerDao.getCustomerById(id);
    }

    public int addItemToCart(Integer productId, UUID userId) {
        return customerDao.insertItemToCart(productId, userId);
    }

    public List<Product> findItemsInCart(UUID userId) {return customerDao.getItemsInCart(userId);}

    public int deleteItemInCart(Integer productId, UUID userId) {return customerDao.removeItemFromCart(productId, userId);}

    public int buyItemInCart(Integer productId, UUID userId) {return customerDao.buyItemFromCart(productId, userId);}

    public int addItemToBought(Integer productId, UUID userId, float rating) {
        return customerDao.insertItemToBought(productId, userId, rating);
    }

    public List<Product> findPurchaseById(UUID userId) {
        return customerDao.getPurchaseById(userId);
    }
}
