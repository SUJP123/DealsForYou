package com.collegeproject.dealsforyou.promo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/promo")
public class PromoController {

    private PromoService promoService;

    public PromoController(PromoService promoService) {
        this.promoService = promoService;
    }

    @GetMapping("/{company}")
    public List<Promo> findPromosByCompany(@PathVariable("company") String company) {
        return promoService.findPromosByCompany(company);
    }
}
