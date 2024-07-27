package com.collegeproject.dealsforyou.customer;

import java.util.List;
import java.util.Optional;
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

    Optional<Customer> getCustomerById(UUID id);

    int insertItemToCart(Integer productId, UUID userId);

    int insertItemToBought(Integer productId, UUID userId, float rating);

}
