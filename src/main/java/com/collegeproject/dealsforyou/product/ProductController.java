package com.collegeproject.dealsforyou.product;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/products")
@CrossOrigin(origins = {"http://localhost:3000", "https://dealsforyou.vercel.app"})
public class ProductController {

    private final ProductService productService;


    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{company}")
    public List<Product> getProductsByCompany(@PathVariable("company") String company) {
        return productService.getProductsByCompany(company);
    }

    @GetMapping("/filter")
    public List<Product> getProductsByFilter(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String clothingType,
            @RequestParam(required = false) Float minRetail,
            @RequestParam(required = false) Float maxRetail,
            @RequestParam(required = false) String gender) {

        return productService.getProductsByFilter(name, company, clothingType, minRetail, maxRetail, gender);
    }

    @GetMapping("/search/{id}")
    public Product getProductById(@PathVariable("id") Integer id) {
        return productService.getProductById(id);
    }

    @GetMapping("/recommend/{id}")
    public List<Product> getRecommendedProductIds(@PathVariable("id") UUID userId) {
        return productService.getRecommendedProductIds(userId);
    }
}
