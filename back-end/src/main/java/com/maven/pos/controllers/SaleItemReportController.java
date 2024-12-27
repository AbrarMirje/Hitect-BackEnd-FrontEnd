package com.maven.pos.controllers;

import com.maven.pos.entities.dto.SaleSummaryDateRequest;
import com.maven.pos.services.ISaleItemReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
@CrossOrigin("*")
public class SaleItemReportController {

    @Autowired
    private ISaleItemReport saleItemReport;
    @GetMapping("/sale-reports")
    public ResponseEntity<?> getAllSaleReports(){
        return ResponseEntity.ok(saleItemReport.getAllSaleReports());
    }

    @GetMapping("/sale-cash-reports")
    public ResponseEntity<?> getCashSaleReports(){
        return ResponseEntity.ok(saleItemReport.getCashSaleReports());
    }
    @GetMapping("/sale-upi-reports")
    public ResponseEntity<?> getUpiSaleReports(){
        return ResponseEntity.ok(saleItemReport.getUpiSaleReports());
    }

    @PostMapping("/sale-upi-date-reports")
    public  ResponseEntity<?> getDateSummaryUpiReports(@RequestBody SaleSummaryDateRequest saleSummaryDateRequest){

         return ResponseEntity.ok(saleItemReport.getDateSummaryUPISaleReports(saleSummaryDateRequest.getStartDate(),saleSummaryDateRequest.getEndDate()));
    }

    @PostMapping("/sale-cash-date-reports")
    public  ResponseEntity<?> getDateSummaryCashReports(@RequestBody SaleSummaryDateRequest saleSummaryDateRequest){

        return ResponseEntity.ok(saleItemReport.getDateSummaryCashSaleReports(saleSummaryDateRequest.getStartDate(),saleSummaryDateRequest.getEndDate()));
    }
}
