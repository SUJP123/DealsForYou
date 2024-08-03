package com.collegeproject.dealsforyou.promo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/promo")
public class PromoController {

    private PromoService promoService;

    public PromoController(PromoService promoService) {
        this.promoService = promoService;
    }

    @GetMapping("/filter")
    public List<Promo> findPromosByCompany(
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String clothingType
        ) {
        return promoService.findPromosByCompany(company, clothingType);
    }
}
