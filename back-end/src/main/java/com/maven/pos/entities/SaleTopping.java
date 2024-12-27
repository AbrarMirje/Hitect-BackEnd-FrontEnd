package com.maven.pos.entities;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sale_toppings")
@ToString
public class SaleTopping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @ManyToOne
    @JoinColumn(name = "topping_id")
    private Topping topping;


    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

}