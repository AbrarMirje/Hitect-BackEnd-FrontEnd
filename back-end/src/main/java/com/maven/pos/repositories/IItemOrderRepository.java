package com.maven.pos.repositories;


import com.maven.pos.entities.ItemOrders;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IItemOrderRepository extends JpaRepository<ItemOrders,Long> {

    @Modifying
    @Transactional
    @Query("UPDATE ItemOrders io SET io.status = :status WHERE io.itemId = :itemId AND io.saleId = :saleId AND (:toppingId IS NULL OR io.toppingId = :toppingId)")
    int updateStatusByItemIdAndToppingIdAndSaleId(boolean status, Long itemId, Long toppingId, Long saleId);


    @Query("SELECT io FROM ItemOrders io WHERE io.status = false AND FUNCTION('DATE', io.itemOrderDate) = :itemOrderDate")
    List<ItemOrders> findAllByStatusFalseAndCreatedDate(@Param("itemOrderDate") LocalDate itemOrderDate);

    List<ItemOrders> findByStatusFalseAndItemOrderDate(LocalDate date);

    List<ItemOrders> findByStatusTrueAndItemOrderDate(LocalDate date);

    @Modifying
    @Transactional
    @Query("DELETE FROM ItemOrders io WHERE io.saleId = :saleId AND io.itemId = :itemId" +
            " AND (:toppingId IS NULL OR io.toppingId = :toppingId)")
    void deleteItemOrder(Long saleId, Long itemId, Long toppingId);
}
