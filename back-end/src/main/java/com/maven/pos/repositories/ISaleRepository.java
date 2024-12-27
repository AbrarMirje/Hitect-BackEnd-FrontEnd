package com.maven.pos.repositories;

import com.maven.pos.entities.Sale;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ISaleRepository extends JpaRepository<Sale,Long> {

    @Query("SELECT s FROM Sale s WHERE s.paymentMode = 'CASH'")
    List<Sale> getCashSaleReports();

    @Query("SELECT s FROM Sale s WHERE s.paymentMode = 'UPI'")
    List<Sale> getUpiSaleReports();

    @Query(nativeQuery = true, value = "SELECT * FROM sale_table WHERE item_sale_date BETWEEN ?1 AND ?2 AND payment_mode = 'UPI'")
    List<Sale> getDateUPISaleReports(LocalDate startDate, LocalDate endDate);

    @Query(nativeQuery = true, value = "SELECT * FROM sale_table WHERE item_sale_date BETWEEN ?1 AND ?2 AND payment_mode = 'CASH'")
    List<Sale> getDateCashSaleReports(LocalDate startDate, LocalDate endDate);

    @Query("SELECT COUNT(s) FROM Sale s WHERE s.itemSaleDate = :today AND s.paymentMode = :paymentMode")
    Integer countSalesByDateAndPaymentMode(@Param("today") LocalDate today, @Param("paymentMode") String paymentMode);

    @Query("SELECT SUM(s.finalTotal) FROM Sale s WHERE s.itemSaleDate = :today AND s.paymentMode = :paymentMode")
    Double getGrandTotalOfSalesByDateAndPaymentMode(@Param("today") LocalDate today, @Param("paymentMode") String paymentMode);

    @Query("SELECT s FROM Sale s " +
            "JOIN s.saleItems si " +
            "JOIN s.saleToppings st ON st.sale.saleId = s.saleId AND st.item.itemId = si.item.itemId " +
            "WHERE s.saleId = :saleId " +
            "AND si.item.itemId = :itemId " +
            "AND st.topping.toppingId = :toppingId")
    Sale findSaleBySaleIdAndItemIdAndToppingId(@Param("saleId") Long saleId,
                                               @Param("itemId") Long itemId,
                                               @Param("toppingId") Long toppingId);

    @Query("SELECT s FROM Sale s " +
            "JOIN s.saleItems si " +
            "WHERE s.saleId = :saleId " +
            "AND si.item.itemId = :itemId")
    Sale findSaleBySaleIdAndItemId(@Param("saleId") Long saleId,
                                   @Param("itemId") Long itemId);


}
