package com.maven.pos.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TempSale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tempSaleId;

    private Long billNumber;
    private Long itemId;
    private Long toppingId;
    private Boolean status;
}
