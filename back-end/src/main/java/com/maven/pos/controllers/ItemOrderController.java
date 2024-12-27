package com.maven.pos.controllers;

import com.maven.pos.entities.dto.SaleToppingStatus;
import com.maven.pos.services.IItemOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/itemOrder")
@CrossOrigin("*")
public class ItemOrderController {

    @Autowired
    private IItemOrderService itemOrderService;

    @PatchMapping("/update-order-status")
    public ResponseEntity<?> updateOrderStatus(@RequestBody SaleToppingStatus saleToppingStatus) {

        int row = itemOrderService.updateOrderStatus(saleToppingStatus);

        if (row > 0) {
            return ResponseEntity.ok("order status updated...!");
        } else {
            return ResponseEntity.ok("order not status updated...!");
        }
    }

    @PostMapping("/remove-order")
    public ResponseEntity<?> removeOrder(@RequestBody SaleToppingStatus saleToppingStatus) {
        itemOrderService.removeOrder(saleToppingStatus);
        return ResponseEntity.ok("order removed successfully....!");
    }
}
