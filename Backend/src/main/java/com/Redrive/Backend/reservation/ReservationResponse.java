package com.Redrive.Backend.reservation;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class ReservationResponse {

    private Integer id;
    private LocalDateTime date;
    private Integer customerId;
    private Integer vehicleId;
    private Integer duration;
    private LocalTime starts;
    private LocalTime ends;
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

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Integer vehicleId) {
        this.vehicleId = vehicleId;
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
