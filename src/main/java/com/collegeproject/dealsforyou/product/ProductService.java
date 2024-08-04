package com.collegeproject.dealsforyou.product;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private ProductDao productDao;

    public ProductService(@Qualifier("postgres_products") ProductDao productDao) {
        this.productDao = productDao;
    }

    public List<Product> getAllProducts() {
        return productDao.selectAllProducts();
    }

    public List<Product> getProductsByCompany(String company) {
        return productDao.selectProductsByCompany(company);
    }

    public List<Product> getProductsByFilter(String name, String company,
                                             String clothingType, Float minRetail,
                                             Float maxRetail, String gender) {
        return productDao.selectByFilter(name, company, clothingType, minRetail, maxRetail, gender);
    }

    public Product getProductById(Integer id) {
        return productDao.selectProductById(id);
    }

    public List<Product> getRecommendedProductIds(UUID userId) {
        return productDao.selectRecommendedProductIds(userId);
    }
}
