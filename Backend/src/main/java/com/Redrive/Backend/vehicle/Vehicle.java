package com.Redrive.Backend.vehicle;

import static com.Redrive.Backend.validation.ValidationMessages.*;

import com.Redrive.Backend.reservation.Reservation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @SequenceGenerator(
//            name = "VehicleIDGenerator",
//            sequenceName = "VehicleIDSequence",
//            allocationSize = 1
//    )
    private Integer id;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @Column(nullable = false, length = 50)
    private String model;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @Column(nullable = false, length = 50)
    private String brand;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @Positive(message = FIELD_MUST_BE_POSITIVE)
    @Column(nullable = false)
    private Integer year;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @PositiveOrZero(message = FIELD_CANNOT_BE_NEGATIVE)
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    private Boolean available;

    private String imageUrl;

    @JsonIgnore
    @OneToMany
    private List<Reservation> reservations;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
