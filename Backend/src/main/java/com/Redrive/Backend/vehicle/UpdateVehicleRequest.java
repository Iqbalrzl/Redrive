package com.Redrive.Backend.vehicle;

import java.math.BigDecimal;

public class UpdateVehicleRequest {
    private String brand;
    private String model;
    private BigDecimal price;
    private Integer year;

    public Integer getYear() {
        return year;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getModel() {
        return model;
    }

    public String getBrand() {
        return brand;
    }
}


