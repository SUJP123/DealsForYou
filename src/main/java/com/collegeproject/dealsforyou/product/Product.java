package com.collegeproject.dealsforyou.product;

import jakarta.persistence.Column;
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
    @Column(name="id")
    private Integer id;

    @NotBlank
    @Column(name="name")
    private String name;

    @NotBlank
    @Column(name="retail")
    private float retail;

    @NotBlank
    @Column(name="deal")
    private float deal;

    @NotBlank
    @Column(name="saved")
    private String saved;

    @NotBlank
    @Column(name="description")
    private String description;

    @NotBlank
    @Column(name="company")
    private String company;

    @NotBlank
    @Column(name="clothing_type")
    private String clothingType;

    @NotBlank
    @Column(name="image")
    private String image;

    @NotBlank
    @Column(name="external_link")
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
