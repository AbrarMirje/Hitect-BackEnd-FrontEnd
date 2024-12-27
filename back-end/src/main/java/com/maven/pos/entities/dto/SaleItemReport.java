package com.maven.pos.entities.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleItemReport {
    private Long billNumber;
    private String itemName;
    private Integer quantity;
    private Double subTotal;
    private Double extraCharges;
    private Double parcelCharges;
    private Double finalTotal;
    private String paymentMode;
}
