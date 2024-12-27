package com.maven.pos.controllers;

import com.maven.pos.entities.dto.SaleItems;
import com.maven.pos.services.ISaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sale")
@CrossOrigin("*")
public class SaleController {
    @Autowired
    private ISaleService saleService;

    @PostMapping("/add-sale")
    public ResponseEntity<?> addSale(@RequestBody SaleItems saleItems) {

        System.out.println(saleItems);
        return ResponseEntity.ok(saleService.addSale(saleItems));
    }

    @GetMapping("/total-cash-orders")
    public ResponseEntity<?> totalCashCounterOrder(){

         return ResponseEntity.ok(saleService.totalCashCounterOrders());
    }

    @GetMapping("/total-upi-orders")
    public ResponseEntity<?> totalUpiCounterOrder(){

        return ResponseEntity.ok(saleService.totalUpiCounterOrders());
    }

    @GetMapping("/grand-total-upi-orders")
    public ResponseEntity<?> grandTotalUpiCounterOrders(){

        return ResponseEntity.ok(saleService.grandTotalUpiCounterOrders());
    }

    @GetMapping("/grand-total-cash-orders")
    public ResponseEntity<?> grandTotalCashCounterOrders(){

        return ResponseEntity.ok(saleService.grandTotalCashCounterOrders());
    }

    @GetMapping("/get-pending-orders-kitchen")
    public ResponseEntity<?> getPendingOrdersKitchen(){
      return ResponseEntity.ok(saleService.getPendingOrdersKitchen());
    }

    @GetMapping("/get-pending-orders-counter")
    public ResponseEntity<?> getPendingOrdersCounter(){
       return ResponseEntity.ok(saleService.getPendingOrdersCounter());
    }

    @GetMapping("/get-completed-orders-counter")
    public ResponseEntity<?> getCompletedOrdersCounter(){
        return ResponseEntity.ok(saleService.getCompletedOrdersCounter());
    }

}
