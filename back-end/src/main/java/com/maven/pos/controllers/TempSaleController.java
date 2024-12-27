package com.maven.pos.controllers;

import com.maven.pos.entities.TempSale;
import com.maven.pos.services.ITempSaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tempSale")
@CrossOrigin("*")
public class TempSaleController {

    @Autowired
    private ITempSaleService tempSaleService;

    @PostMapping("/delete-tempSale")
    public ResponseEntity<?> deleteTempSale(@RequestBody TempSale tempSale){
        tempSaleService.deleteTempSale(tempSale);
        System.out.println(tempSale);
        return ResponseEntity.ok("deleted...!");
    }

    @GetMapping("/get-customer-completedOrders")
    public ResponseEntity<?> getCompletedOrders(){

        return ResponseEntity.ok(tempSaleService.getAllTempSales());
    }
}
