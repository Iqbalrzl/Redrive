package com.Redrive.Backend.vehicle;

import static com.Redrive.Backend.validation.ValidationMessages.*;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.lang.NonNull;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public class CreateVehicleRequest {

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    private String brand;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    private String model;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @PositiveOrZero(message = FIELD_MUST_BE_POSITIVE)
    private BigDecimal price;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @Positive(message = FIELD_MUST_BE_POSITIVE)
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
