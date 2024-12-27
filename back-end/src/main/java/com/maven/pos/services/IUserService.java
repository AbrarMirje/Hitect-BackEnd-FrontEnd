package com.maven.pos.services;

import com.maven.pos.entities.User;

public interface IUserService {

    User saveUser(User user);
    User getUserByUsernameAndPassword(String username, String password);
}
