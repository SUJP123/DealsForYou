package com.collegeproject.dealsforyou.product;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("postgres_products")
public class ProductDaoService implements ProductDao{

    private JdbcTemplate jdbcTemplate;

    public ProductDaoService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Product> selectAllProducts() {
        final String sql = "SELECT * FROM products ORDER BY RAND ()";
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

    public List<Product> selectByFilter(String name, String company, String clothingType, Float minRetail, Float maxRetail, String gender) {
        StringBuilder sql = new StringBuilder("SELECT * FROM products WHERE 1=1");

        List<Object> params = new ArrayList<>();

        if (name != null && !name.isEmpty()) {
            sql.append(" AND name LIKE ?");
            params.add("%" + name + "%");
        }
        if (company != null && !company.isEmpty()) {
            sql.append(" AND company = ?");
            params.add(company);
        }
        if (clothingType != null && !clothingType.isEmpty()) {
            sql.append(" AND clothing_type LIKE ?");
            params.add("%" + clothingType + "%");
        }
        if (minRetail != null) {
            sql.append(" AND deal >= ?");
            params.add(minRetail);
        }
        if (maxRetail != null) {
            sql.append(" AND deal <= ?");
            params.add(maxRetail);
        }
        if (gender != null && !gender.isEmpty()) {
            sql.append(" AND clothing_type LIKE ?");
            params.add("%" + gender + "%");
        }

        sql.append(" ORDER BY RANDOM()");

        return jdbcTemplate.query(sql.toString(), params.toArray(), (resultSet, i) -> {
            Integer id = resultSet.getInt("id");
            String names = resultSet.getString("name");
            Float retail = resultSet.getFloat("retail");
            Float deal = resultSet.getFloat("deal");
            String saved = resultSet.getString("saved");
            String description = resultSet.getString("description");
            String company_name = resultSet.getString("company");
            String clothing_Type = resultSet.getString("clothing_type");
            String image = resultSet.getString("image");
            String externalUrl = resultSet.getString("external_link");
            return new Product(id, names, retail, deal, saved, description, company_name, clothing_Type, image, externalUrl);
        });
    }

    @Override
    public Product selectProductById(Integer id) {
        final String sql = "SELECT * FROM products WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (resultSet, i) -> {
            String names = resultSet.getString("name");
            Float retail = resultSet.getFloat("retail");
            Float deal = resultSet.getFloat("deal");
            String saved = resultSet.getString("saved");
            String description = resultSet.getString("description");
            String company_name = resultSet.getString("company");
            String clothing_Type = resultSet.getString("clothing_type");
            String image = resultSet.getString("image");
            String externalUrl = resultSet.getString("external_link");
            return new Product(id, names, retail, deal, saved, description, company_name, clothing_Type, image, externalUrl);
        });
    }
}
