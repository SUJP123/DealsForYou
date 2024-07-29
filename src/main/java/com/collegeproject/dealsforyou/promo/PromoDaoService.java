package com.collegeproject.dealsforyou.promo;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("postgrespromo")
public class PromoDaoService implements PromoDao{

    private JdbcTemplate jdbcTemplate;

    public PromoDaoService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Promo> selectPromoByCompany(String company) {
        final String sql = "SELECT * FROM promos WHERE company = ?";
        return jdbcTemplate.query(sql, new Object[]{company}, (resultSet, i) -> {
            Integer id = Integer.valueOf(resultSet.getString("id"));
            String description = resultSet.getString("description");
            Boolean codeRequired = Boolean.valueOf(resultSet.getString("code_required"));
            String promoCode = resultSet.getString("promo_code");
            String url = resultSet.getString("url");
            return new Promo(id, description, codeRequired, promoCode, url, company);
        });
    }
}
