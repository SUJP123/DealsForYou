package com.collegeproject.dealsforyou.product;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("postgres_products")
public class ProductDaoService implements ProductDao{

    private JdbcTemplate jdbcTemplate;

    public ProductDaoService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Product> selectAllProducts() {
        final String sql = "SELECT * FROM products";
        return jdbcTemplate.query(sql, (resultSet, i) -> {
            Integer id = Integer.valueOf(resultSet.getString("id"));
            String name = resultSet.getString("name");
            Float retail = Float.valueOf(resultSet.getString("retail"));
            Float deal = Float.valueOf(resultSet.getString("deal"));
            String saved = resultSet.getString("saved");
            String description = resultSet.getString("description");
            String company = resultSet.getString("company");
            String clothingType = resultSet.getString("clothing_type");
            String image = resultSet.getString("image");
            String externalUrl = resultSet.getString("external_link");
            return new Product(id, name, retail, deal, saved, description, company, clothingType, image, externalUrl);
        });
    }

    @Override
    public List<Product> selectProductsByCompany(String company) {
        final String sql = "SELECT * FROM products WHERE company = ?";
        return jdbcTemplate.query(sql, new Object[]{company}, (resultSet, i) -> {
            Integer id = Integer.valueOf(resultSet.getString("id"));
            String name = resultSet.getString("name");
            Float retail = Float.valueOf(resultSet.getString("retail"));
            Float deal = Float.valueOf(resultSet.getString("deal"));
            String saved = resultSet.getString("saved");
            String description = resultSet.getString("description");
            String clothingType = resultSet.getString("clothing_type");
            String image = resultSet.getString("image");
            String externalUrl = resultSet.getString("external_link");
            return new Product(id, name, retail, deal, saved, description, company, clothingType, image, externalUrl);
        });
    }
}
