package com.maven.pos.repositories;

import com.maven.pos.entities.TempSale;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ITempSaleRepository extends JpaRepository<TempSale,Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM TempSale t WHERE t.billNumber = ?1 AND t.itemId = ?2" +
            " AND (?3 IS NULL OR t.toppingId = ?3)")
    void deleteByItemIdAndBillNumberAndOptionalToppingId(Long billNumber, Long itemId, Long toppingId);
}
