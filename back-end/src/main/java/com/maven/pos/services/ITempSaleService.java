package com.maven.pos.services;

import com.maven.pos.entities.TempSale;

import java.util.List;

public interface ITempSaleService {

    void deleteTempSale(TempSale tempSale);

    List<TempSale> getAllTempSales();
}
