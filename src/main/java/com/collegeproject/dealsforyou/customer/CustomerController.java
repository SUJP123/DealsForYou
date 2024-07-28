package com.collegeproject.dealsforyou.customer;

import com.collegeproject.dealsforyou.product.Product;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/customer")
public class CustomerController {

    private CustomerService customerService;

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

    @GetMapping("/search/{email}")
    public UUID findIdByEmail(@PathVariable("email") String email) {
        return customerService.findIdByEmail(email);
    }

    @GetMapping("/{id}")
    public Optional<Customer> findCustomerById(@PathVariable("id") UUID id) {
        return customerService.findCustomerById(id);
    }

    @PostMapping("/cart/{productId}/{userId}")
    public int addItemToCart(@PathVariable("productId") Integer productId,
                             @PathVariable("userId") UUID userId) {
        return customerService.addItemToCart(productId, userId);
    }

    @GetMapping("/{id}/getcart")
    public List<Product> findItemsInCart(@PathVariable("id") UUID userId) {
        return customerService.findItemsInCart(userId);
    }

    @PutMapping("/delete/{userId}/{productId}")
    public int deleteItemInCart(@PathVariable("productId") Integer productId,
                                @PathVariable("userId") UUID userId) {
        return customerService.deleteItemInCart(productId, userId);
    }

    @PutMapping("/update/{userId}/{productId}")
    public int updateItemInCart(@PathVariable("productId") Integer productId,
                                @PathVariable("userId") UUID userId) {
        return customerService.buyItemInCart(productId, userId);
    }

    @PostMapping("/bought")
    public int addItemToBought(@RequestParam Integer productId,
                               @RequestParam UUID userId,
                               @RequestParam float rating) {
        return customerService.addItemToBought(productId, userId, rating);
    }

    @GetMapping("/bought/{userId}")
    public List<Product> findPurchasesById(@PathVariable("userId") UUID userId) {
        return customerService.findPurchaseById(userId);
    }



}
