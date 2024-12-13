package com.Redrive.Backend.Customer;

import com.Redrive.Backend.auth.User;
import com.Redrive.Backend.reservation.Reservation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.Redrive.Backend.validation.ValidationMessages.*;

@Entity
public class Customer extends User {

    private LocalDate birthdate;

    private String phone;

    private String address;

    @JsonIgnore
    @OneToMany
    private List<Reservation> reservations;

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
