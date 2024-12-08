package com.Redrive.Backend.auth;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import static com.Redrive.Backend.validation.ValidationMessages.FIELD_CANNOT_BE_NULL;
import static com.Redrive.Backend.validation.ValidationMessages.PASSWORD_MUST_BE_8_CHARACTERS;

@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    private String username;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @Size(min = 8, message = PASSWORD_MUST_BE_8_CHARACTERS)
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
