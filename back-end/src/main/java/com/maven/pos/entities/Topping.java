package com.maven.pos.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "toppings_table")
public class Topping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long toppingId;

    @Column(name = "topping_name")
    private String toppingName;

    @Column(name = "topping_price")
    private Double toppingPrice;

    @JsonIgnore
    @OneToMany(mappedBy = "topping", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<SaleTopping> saleToppings;

}
