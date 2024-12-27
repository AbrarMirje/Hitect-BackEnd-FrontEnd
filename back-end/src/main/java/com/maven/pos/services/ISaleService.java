package com.maven.pos.services;

import com.maven.pos.entities.dto.SaleItemReport;
import com.maven.pos.entities.dto.SaleItemStatusOrders;
import com.maven.pos.entities.dto.SaleItems;

import java.util.List;

public interface ISaleService {

    SaleItems addSale(SaleItems saleItems);

    Integer totalCashCounterOrders();

    Integer totalUpiCounterOrders();

    Double grandTotalUpiCounterOrders();

    Double grandTotalCashCounterOrders();

    List<SaleItemStatusOrders> getPendingOrdersKitchen();

    List<SaleItemReport> getPendingOrdersCounter();

    List<SaleItemReport> getCompletedOrdersCounter();
}


