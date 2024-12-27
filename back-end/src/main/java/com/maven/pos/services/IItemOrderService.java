package com.maven.pos.services;

import com.maven.pos.entities.ItemOrders;
import com.maven.pos.entities.dto.SaleToppingStatus;
import org.springframework.web.bind.annotation.RequestBody;

public interface IItemOrderService {

    ItemOrders addItemOrders(Long saleId, Long itemId, Long toppingId, Integer quantity);

    int updateOrderStatus(SaleToppingStatus saleToppingStatus);

    void removeOrder(SaleToppingStatus saleToppingStatus);
}
