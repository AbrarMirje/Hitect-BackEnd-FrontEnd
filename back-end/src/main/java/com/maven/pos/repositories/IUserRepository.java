package com.maven.pos.repositories;

import com.maven.pos.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
    User getUserByUsernameAndPassword(String email, String password);
    Optional<User> getUserByUsername(String username);

}
