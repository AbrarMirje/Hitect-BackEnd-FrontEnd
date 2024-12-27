package com.maven.pos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sale_table")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long saleId;

    @Column(name = "sub_total")
    private Double subTotal;

    @Column(name = "extra_charges")
    private Double extraCharges;

    @Column(name = "parcel_charges")
    private Double parcelCharges;

    @Column(name = "final_total")
    private Double finalTotal;

    @Column(name = "payment_mode")
    private String paymentMode;

    private LocalDate itemSaleDate;

    private LocalTime itemSaleTime;

    // Relationship with SaleItem
    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL)
    private List<SaleItem> saleItems;

    // Relationship with SaleTopping
    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL)
    private List<SaleTopping> saleToppings;
}
