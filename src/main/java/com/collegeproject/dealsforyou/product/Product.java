package com.collegeproject.dealsforyou.product;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Entity
@Table(name="products")
public class Product {

    @Id
    private Integer id;

    @NotBlank
    private String name;

    @NotBlank
    private float retail;

    @NotBlank
    private float deal;

    @NotBlank
    private String saved;

    @NotBlank
    private String description;

    @NotBlank
    private String company;

    @NotBlank
    private String clothingType;

    @NotBlank
    private String image;

    @NotBlank
    private String externalURL;


    public Product() {
        super();
    }

    public Product(Integer id, String name, float retail,
                   float deal, String saved, String description,
                   String company, String clothingType, String image,
                   String externalURL) {
        this.id = id;
        this.name = name;
        this.retail = retail;
        this.deal = deal;
        this.saved = saved;
        this.description = description;
        this.company = company;
        this.clothingType = clothingType;
        this.image = image;
        this.externalURL = externalURL;
    }
}
