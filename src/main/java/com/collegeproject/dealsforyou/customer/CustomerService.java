package com.collegeproject.dealsforyou.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerService {

    private final CustomerDao customerDao;

    public CustomerService(@Qualifier("postgres") CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    public int addCustomer(Customer customer) {
        return customerDao.insertCustomer(customer);
    }

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
