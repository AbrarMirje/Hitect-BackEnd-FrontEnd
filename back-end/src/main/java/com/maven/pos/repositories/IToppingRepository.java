package com.maven.pos.repositories;

import com.maven.pos.entities.Topping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IToppingRepository extends JpaRepository<Topping,Long> {
}
