package com.Redrive.Backend.exception;

public class InvalidAuthorizationHeader extends IllegalArgumentException{

    public InvalidAuthorizationHeader(String message){
        super(message);
    }
}
