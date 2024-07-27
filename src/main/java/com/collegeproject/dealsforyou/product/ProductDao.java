package com.collegeproject.dealsforyou.product;

import java.util.List;

public interface ProductDao {

    List<Product> selectAllProducts();
    List<Product> selectProductsByCompany(String company);
    List<Product> selectByFilter(String name, String company,
                                 String clothingType, Float minRetail,
                                 Float maxRetail, String gender);

}
