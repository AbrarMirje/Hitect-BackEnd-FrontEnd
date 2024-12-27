package com.maven.pos.entities.dto;

import com.maven.pos.entities.dto.helper.SaleItemsHelper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleItems {

    private List<SaleItemsHelper> saleItemsHelpers;
    private Double subTotal;
    private Double extraCharges;
    private Double parcelCharges;
    private Double finalTotal;
    private String paymentMode;
    private LocalDate itemSaleDate;
    private LocalTime itemSaleTime;
}
