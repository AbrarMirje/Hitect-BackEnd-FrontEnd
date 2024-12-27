package com.maven.pos.services;

import com.maven.pos.entities.dto.SaleItemReport;

import java.time.LocalDate;
import java.util.List;

public interface ISaleItemReport {
    List<SaleItemReport> getAllSaleReports();
    List<SaleItemReport> getCashSaleReports();
    List<SaleItemReport> getUpiSaleReports();
    List<SaleItemReport> getDateSummaryUPISaleReports(LocalDate startDate,LocalDate endDate);

    List<SaleItemReport> getDateSummaryCashSaleReports(LocalDate startDate,LocalDate endDate);
}
