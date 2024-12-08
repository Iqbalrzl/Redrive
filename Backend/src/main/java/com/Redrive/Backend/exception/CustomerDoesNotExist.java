package com.Redrive.Backend.exception;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomerDoesNotExist extends UsernameNotFoundException {
    public CustomerDoesNotExist(String message) {
        super(message);
    }
}
