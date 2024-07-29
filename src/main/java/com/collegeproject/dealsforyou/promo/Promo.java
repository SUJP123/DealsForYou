package com.collegeproject.dealsforyou.promo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@Table(name="promos")
public class Promo {

    @Id
    private Integer id;

    @Column(name = "description")
    private String description;

    @Column(name = "code_required")
    private boolean codeRequired;

    @Column(name= "promo_code")
    private String promoCode;

    @Column(name = "url")
    private String url;

    @Column(name= "company")
    private String company;

    public Promo(Integer id, String description,
                 boolean codeRequired, String promoCode,
                 String url, String company) {
        this.id = id;
        this.description = description;
        this.codeRequired = codeRequired;
        this.promoCode = promoCode;
        this.url = url;
        this.company = company;
    }
}
