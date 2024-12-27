package com.maven.pos.entities.dto;

import com.maven.pos.entities.Item;
import com.maven.pos.entities.Sale;
import com.maven.pos.entities.Topping;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleToppingStatus {

    private Sale sale;

    private Item item;

    private Topping topping;

}
