package com.Redrive.Backend.exception;

import jakarta.persistence.EntityNotFoundException;

public class VehicleDoesNotExist extends EntityNotFoundException {
    public VehicleDoesNotExist(String message){
        super(message);
    }
}
