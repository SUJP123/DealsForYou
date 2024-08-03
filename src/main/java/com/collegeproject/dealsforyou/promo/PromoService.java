package com.collegeproject.dealsforyou.promo;


import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromoService {

    private PromoDao promoDao;

    public PromoService(@Qualifier("postgrespromo") PromoDao promoDao) {
        this.promoDao = promoDao;
    }

    public List<Promo> findPromosByCompany(String company, String clothingType) {
        return promoDao.selectPromoByCompany(company, clothingType);
    }
}
