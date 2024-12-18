package com.Redrive.Backend.vehicle;

import com.Redrive.Backend.exception.VehicleDoesNotExist;
import com.Redrive.Backend.image.Image;
import com.Redrive.Backend.image.ImageService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class VehicleService {

    private final VehicleRepository repository;
    private final ImageService imgService;

    public VehicleService(
            VehicleRepository repository,
            ImageService imgService
    ){
        this.repository = repository;
        this.imgService = imgService;
    }

    public List<Vehicle> listVehicle(){
        return repository.findAll();
    }

    public Vehicle getVehicleById(Integer id){
        Optional<Vehicle> vehicle = repository.findById(id);
        if (vehicle.isPresent()){
            return vehicle.get();
        }
        return null;
    }

    public String createVehicle(CreateVehicleRequest request) throws IOException {
        var vehicle = new Vehicle();
        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setPrice(request.getPrice());
        vehicle.setYear(request.getYear());
        repository.save(vehicle);
        return "Successfuly created";
    }

    public boolean updateVehicle(Integer id, UpdateVehicleRequest request){
        Optional<Vehicle> vhcl= repository.findById(id);
        if (!vhcl.isPresent()){
            return false;
        }
        var vehicle = vhcl.get();
        if (request.getBrand() != null){
        vehicle.setBrand(request.getBrand());
        }
        if (request.getModel() != null){
        vehicle.setModel(request.getModel());
        }
        if (request.getPrice() != null){
        vehicle.setPrice(request.getPrice());
        }
        if (request.getYear()!= null){
        vehicle.setYear(request.getYear());
        }
        repository.save(vehicle);
        return true;
    }

    public Map<Boolean, String> deleteVehicle(Integer id){
        HashMap<Boolean, String> result = new HashMap<>();
        Optional<Vehicle> vhcl = repository.findById(id);

        if (!vhcl.isPresent()){
            return Map.of(false, "Vehicle does not exist.");
        }

        var vehicle = vhcl.get();

        if (vehicle.getReservations() == null){
            return Map.of(false,"Failed to delete because vehicle associated with reservations");
        }
        repository.deleteById(id);
        return Map.of(true,"Successfully deleted");
    }

    public String setVehicleImage(Integer id, MultipartFile file) throws IOException {

        String url = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .toUriString();
        Optional<Vehicle> vhcl = repository.findById(id);

        if (vhcl.isPresent()){
            Vehicle vehicle = vhcl.get();
            String imagePath = imgService.uploadVehicleImage(file);
            String encodedFilename = URLEncoder.encode(file.getOriginalFilename(), StandardCharsets.UTF_8).replace("+","%20");
            vehicle.setImageUrl(
                    url + "/api/vehicle/image/" + encodedFilename
            );
            repository.save(vehicle);
            return vehicle.getImageUrl();
        }else {
            throw new EntityNotFoundException("Vehicle not found.");
        }

    }
}
