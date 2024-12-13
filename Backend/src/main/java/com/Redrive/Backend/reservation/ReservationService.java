package com.Redrive.Backend.reservation;

import com.Redrive.Backend.Customer.Customer;
import com.Redrive.Backend.Customer.CustomerRepository;
import com.Redrive.Backend.Customer.CustomerService;
import com.Redrive.Backend.exception.VehicleDoesNotExist;
import com.Redrive.Backend.vehicle.Vehicle;
import com.Redrive.Backend.vehicle.VehicleRepository;
import com.Redrive.Backend.vehicle.VehicleService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository repository;
    private final CustomerRepository custRepository;
    private final VehicleRepository vhclRepository;
    private final CustomerService custService;
    private final VehicleService vhclService;

    public ReservationService(
            ReservationRepository repository,
            CustomerRepository custRepository,
            VehicleRepository vhclRepository,
            CustomerService custService,
            VehicleService vhclService
    ){
        this.repository = repository;
        this.custRepository = custRepository;
        this.vhclRepository = vhclRepository;
        this.custService = custService;
        this.vhclService = vhclService;
    }

    public List<ReservationResponse> reservationListByVehicleId(Integer id){

        Vehicle vehicle = vhclRepository.findById(id).orElseThrow(()->new VehicleDoesNotExist("Vehicle does not exist."));
        List<Reservation> reservation = repository.findByVehicle(vehicle);
        List<ReservationResponse> reservationResponse = new ArrayList<>();

        for (Reservation res : reservation) {
            ReservationResponse response = new ReservationResponse();
            response.setId(res.getId());
            response.setDate(res.getDate());
            response.setCustomerId(res.getCustomer().getId());
            response.setVehicleId(res.getVehicle().getId());
            response.setDuration(res.getDuration());
            response.setStarts(res.getStarts());
            response.setEnds(res.getEnds());
            response.setTotal(res.getTotal());
            reservationResponse.add(response);
        }

        return reservationResponse;
    }

    public ReservationResponse createReservation(
            @NonNull HttpServletRequest request,
            ReservationRequest reservationRequest,
            Integer vehicleId
    ){
        Customer customer = custService.getAuthenticatedCustomer(request);
        Vehicle vehicle = vhclRepository.findById(vehicleId).orElseThrow(()-> new VehicleDoesNotExist("Vehicle does not exist."));

        var reservation = new Reservation();
        reservation.setCustomer(customer);
        reservation.setVehicle(vehicle);
        reservation.setDuration(reservationRequest.getDuration());
        reservation.setStarts(reservationRequest.getStarts());
        reservation.setEnds(reservationRequest.getStarts().plusHours(reservationRequest.getDuration()));
        BigDecimal total = vehicle.getPrice().multiply(BigDecimal.valueOf(reservationRequest.getDuration()));
        reservation.setTotal(total);
        repository.save(reservation);

        List<Reservation> listReservationCustomer = customer.getReservations();
        if (listReservationCustomer == null){
            List<Reservation> newListReservation = new ArrayList<>();
            newListReservation.add(reservation);
        }else {
            listReservationCustomer.add(reservation);
        }

        custRepository.save(customer);

        List<Reservation> listReservationVehicle = vehicle.getReservations();
        if (listReservationVehicle == null){
            List<Reservation> newListReservation = new ArrayList<>();
            newListReservation.add(reservation);
        }else {
            listReservationVehicle.add(reservation);
        }

        vhclRepository.save(vehicle);

        ReservationResponse response = new ReservationResponse();
        response.setId(reservation.getId());
        response.setDate(reservation.getDate());
        response.setCustomerId(reservation.getCustomer().getId());
        response.setVehicleId(vehicle.getId());
        response.setDuration(reservation.getDuration());
        response.setStarts(reservation.getStarts());
        response.setEnds(reservation.getEnds());
        response.setTotal(reservation.getTotal());

        return response;
    }

}
