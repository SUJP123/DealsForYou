package com.collegeproject.dealsforyou.customer;

import java.util.List;
import java.util.UUID;

public interface CustomerDao {

    int insertCustomer(UUID id, String firstName, String lastName, String email, String password, Role role);

    default int insertCustomer(Customer customer) {
        UUID id = UUID.randomUUID();
        return insertCustomer(id, customer.getFirstName(), customer.getLastName(),
                customer.getEmail(), customer.getPassword(), customer.getRole());
    }

    List<Customer> getAllCustomers();

    UUID getIdFromEmail(String email);

    Customer getCustomerById(UUID id);

}
