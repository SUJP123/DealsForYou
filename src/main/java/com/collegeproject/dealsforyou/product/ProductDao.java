package com.collegeproject.dealsforyou.product;

import java.util.List;

public interface ProductDao {

    List<Product> selectAllProducts();
    List<Product> selectProductsByCompany(String company);

}
