package com.maven.pos.controllers;

import com.maven.pos.entities.User;
import com.maven.pos.enums.UserRole;
import com.maven.pos.services.IUserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostConstruct
    public void createFirstAdmin(){
        User firstUser = new User();
        firstUser.setUserId(1L);
        firstUser.setUsername("admin@gmail.com");
        firstUser.setPassword("admin@123");
        firstUser.setRole(UserRole.COUNTER_ADMIN);
        firstUser.setEnabled(true);
        userService.saveUser(firstUser);


        User secondUser = new User();
        secondUser.setUserId(2L);
        secondUser.setUsername("kitchenadmin@gmail.com");
        secondUser.setPassword("kitchen@123");
        secondUser.setRole(UserRole.KITCHEN_ADMIN);
        secondUser.setEnabled(true);
        userService.saveUser(secondUser);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user){
        return userService.getUserByUsernameAndPassword(user.getUsername(), user.getPassword());
    }
}
