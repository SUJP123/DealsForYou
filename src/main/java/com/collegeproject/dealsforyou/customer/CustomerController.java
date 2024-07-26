package com.collegeproject.dealsforyou.customer;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/customer")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> findAllCustomers() {
        return customerService.findAllCustomers();
    }

    @PostMapping
    public int addCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

    @GetMapping("/{email}")
    public Optional<UUID> findIdByEmail(@PathVariable("email") String email) {
        return customerService.findIdByEmail(email);
    }

    @GetMapping("/{id}")
    public Optional<Customer> findCustomerById(@PathVariable("id") UUID id) {
        return customerService.findCustomerById(id);
    }

}
