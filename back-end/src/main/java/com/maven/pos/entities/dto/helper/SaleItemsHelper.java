package com.maven.pos.entities.dto.helper;

import com.maven.pos.entities.Item;
import com.maven.pos.entities.Topping;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleItemsHelper {
    private Item item;
    private List<Topping> toppings;
    private Integer saleQty;
}
