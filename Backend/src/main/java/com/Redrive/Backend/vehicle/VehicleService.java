package com.Redrive.Backend.vehicle;

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

    public String createVehicle(CreateVehicleRequest request) throws IOException {
        var vehicle = new Vehicle();
        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setPrice(request.getPrice());
        vehicle.setYear(request.getYear());
        repository.save(vehicle);
        return "Success";
    }

    public String addVehicleImage(Integer id, MultipartFile file) throws IOException {

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
