package com.Redrive.Backend.vehicle;

import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public class CreateVehicleRequest {

    private String brand;
    private String model;
    private BigDecimal price;
    private Integer year;

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

}
