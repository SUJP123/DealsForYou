package com.collegeproject.dealsforyou.promo;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("postgrespromo")
public class PromoDaoService implements PromoDao{

    private JdbcTemplate jdbcTemplate;

    public PromoDaoService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Promo> selectPromoByCompany(String company, String clothingType) {
        StringBuilder sql = new StringBuilder("SELECT * FROM promos WHERE 1=1");

        List<Object> params = new ArrayList<>();

        if (company != null && !company.isEmpty()) {
            sql.append(" AND company = ?");
            params.add(company);
        }
        if (clothingType != null && !clothingType.isEmpty()) {
            sql.append(" AND description LIKE ?");
            params.add("%" + clothingType + "%");
        }

        return jdbcTemplate.query(sql.toString(), params.toArray(), (resultSet, i) -> {
            Integer id = Integer.valueOf(resultSet.getString("id"));
            String description = resultSet.getString("description");
            Boolean codeRequired = Boolean.valueOf(resultSet.getString("code_required"));
            String promoCode = resultSet.getString("promo_code");
            String url = resultSet.getString("url");
            String companyResult = resultSet.getString("company");
            return new Promo(id, description, codeRequired, promoCode, url, companyResult);
        });
    }
}
