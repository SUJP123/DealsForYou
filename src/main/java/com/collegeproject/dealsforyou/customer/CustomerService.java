package com.collegeproject.dealsforyou.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerService {

    private final CustomerDao customerDao;

    private final CustomerRepository customerRepository;

    public CustomerService(@Qualifier("postgres") CustomerDao customerDao,
                           CustomerRepository customerRepository) {

        this.customerDao = customerDao;
        this.customerRepository = customerRepository;
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

    public Optional<UUID> findIdByEmail(String email) {
        return customerDao.getIdFromEmail(email);
    }

    public Optional<Customer> findCustomerById(UUID id) {
        return customerDao.getCustomerById(id);
    }



}
