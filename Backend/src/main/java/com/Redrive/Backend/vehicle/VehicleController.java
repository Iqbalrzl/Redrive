package com.Redrive.Backend.vehicle;

import com.Redrive.Backend.image.ImageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/vehicle")
//@PreAuthorize("hasRole('USER')")
public class VehicleController {

    @Autowired
    private VehicleRepository repository;

    @Autowired
    private VehicleService service;

    @Autowired
    private ImageService imageService;

    @GetMapping("")
//    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<Vehicle>> list() {
        return ResponseEntity.ok(service.listVehicle());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVehicleById(@PathVariable Integer id) {
        Vehicle vehicle = service.getVehicleById(id);
        if (vehicle != null)
            return ResponseEntity.ok(vehicle);
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "Vehicle does not exist"));
    }

    @GetMapping("/image/{fileName}")
    public ResponseEntity<?> downloadVehicleImage(
            @PathVariable String fileName
    ) throws IOException {
        byte[] downloadImage = imageService.downloadImageFromFileSystem(fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body(downloadImage);
    }
}
