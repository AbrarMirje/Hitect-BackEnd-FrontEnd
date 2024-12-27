package com.maven.pos.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleItemStatusOrders {

    private Long billNumber;
    private String itemName;
    private Integer quantity;
    private Boolean orderStatus;
    private String toppingName;
    private Long toppingId;
}
