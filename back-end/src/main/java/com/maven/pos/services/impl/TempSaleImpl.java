package com.maven.pos.services.impl;

import com.maven.pos.entities.TempSale;
import com.maven.pos.repositories.ITempSaleRepository;
import com.maven.pos.services.ITempSaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TempSaleImpl implements ITempSaleService {

    @Autowired
    private ITempSaleRepository tempSaleRepository;

    @Override
    public void deleteTempSale(TempSale tempSale) {

        tempSaleRepository.deleteById(tempSale.getTempSaleId());

    }

    @Override
    public List<TempSale> getAllTempSales() {
        return tempSaleRepository.findAll();
    }
}
