package com.Redrive.Backend.reservation;

import static com.Redrive.Backend.validation.ValidationMessages.*;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalTime;

public class ReservationRequest {

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @Positive(message = FIELD_MUST_BE_POSITIVE)
    Integer duration;

    @NotNull(message = FIELD_CANNOT_BE_NULL)
    @FutureOrPresent
    LocalTime starts;

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
}
