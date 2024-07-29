package com.collegeproject.dealsforyou.promo;

import java.util.List;

public interface PromoDao {

    List<Promo> selectPromoByCompany(String company);
}
