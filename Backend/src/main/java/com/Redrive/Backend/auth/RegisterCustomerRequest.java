package com.Redrive.Backend.auth;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;

import static com.Redrive.Backend.validation.ValidationMessages.*;

public class RegisterCustomerRequest {

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    private String username;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    private String password;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @Past
    private LocalDate birthdate;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    private String phone;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    private String address;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

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
}
