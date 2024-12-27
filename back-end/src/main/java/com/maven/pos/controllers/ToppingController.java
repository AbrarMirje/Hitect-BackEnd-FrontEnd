package com.maven.pos.controllers;

import com.maven.pos.entities.Topping;
import com.maven.pos.services.IToppingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/topping")
@CrossOrigin("*")
public class ToppingController {

    @Autowired
    private IToppingService toppingService;

    // Creat topping
    @PostMapping("/add-topping")
    public ResponseEntity<Topping> addTopping(@RequestBody Topping topping){
        return ResponseEntity.ok(toppingService.addTopping(topping));
    }

    // Get Topping By id
    @PostMapping("/get-topping")
    public ResponseEntity<Topping> getToppingById(@RequestBody Topping topping){
        return ResponseEntity.ok(toppingService.getToppingById(topping));
    }

    // Get all toppings
    @GetMapping("/get-toppings")
    public ResponseEntity<?> getAllToppings(){
        return ResponseEntity.ok(toppingService.getAllToppings());
    }

    // Delete topping by id
    @DeleteMapping("/delete-topping/{toppingId}")
    public ResponseEntity<Topping> deleteToppingById(@PathVariable("toppingId") Long toppingId){
        return new ResponseEntity<>(toppingService.deleteToppingById(toppingId), HttpStatus.OK);
    }

    // Update Topping
    @PutMapping("/update-topping")
    public ResponseEntity<?> updateTopping(
            @RequestParam("toppingId") Long id,
            @RequestParam("toppingName") String name,
            @RequestParam("toppingPrice") Double price

    ){
        Topping t = new Topping();
        t.setToppingId(id);
        t.setToppingName(name);
        t.setToppingPrice(price);

        return ResponseEntity.ok(toppingService.updateTopping(t));

    }

}