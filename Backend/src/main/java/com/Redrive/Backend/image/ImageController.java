package com.Redrive.Backend.image;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.function.ServerRequest;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("api/image")
public class ImageController {

    private final ImageService service;

    public ImageController(ImageService service){
        this.service = service;
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> download(
            @PathVariable String fileName
    ) throws IOException {
        byte[] downloadImage = service.downloadImageFromFileSystem(fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body(downloadImage);
    }

    @PostMapping
    public ResponseEntity<?> upload(
            @RequestParam("image")MultipartFile file
    )throws IOException {
        String uploadImage = service.uploadImageToFileSystem(file);
        return ResponseEntity.ok(uploadImage);
    }

}
