package com.Redrive.Backend.reservation;

import com.Redrive.Backend.Customer.Customer;
import com.Redrive.Backend.vehicle.Vehicle;
import static com.Redrive.Backend.validation.ValidationMessages.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime date;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @Positive(message = FIELD_MUST_BE_POSITIVE)
    @Column(nullable = false)
    private Integer duration;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @FutureOrPresent(message = TIME_CANNOT_BE_IN_PAST)
    private LocalTime starts;

//    @Future(message = TIME_CANNOT_BE_IN_PAST)
    private LocalTime ends;

    @Column(name = "total_price", precision = 12, scale = 2)
    private BigDecimal total;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public LocalTime getStarts() {
        return starts;
    }

    public void setStarts(LocalTime starts) {
        this.starts = starts;
    }

    public LocalTime getEnds() {
        return ends;
    }

    public void setEnds(LocalTime ends) {
        this.ends = ends;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
