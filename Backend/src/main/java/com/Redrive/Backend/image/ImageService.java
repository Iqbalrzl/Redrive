package com.Redrive.Backend.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;
import java.util.Optional;

@Service
public class ImageService {

    @Value("${media.path}")
    private String MEDIA_PATH;


    @Autowired
    private final ImageRepository repository;

    public ImageService(
            ImageRepository repository
    ){
        this.repository = repository;
    }

    public String uploadImageToFileSystem(MultipartFile file) throws IOException{
        String FILE_PATH = MEDIA_PATH+file.getOriginalFilename();

        Image img = new Image();
        img.setName(file.getOriginalFilename());
        img.setType(file.getContentType());
        img.setFilePath(FILE_PATH);
        Image image = repository.save(img);

        file.transferTo(new File(FILE_PATH));

        if (img != null){
            return "file upload sucessfuly: " + FILE_PATH;
        }
        return null;
    }

    public String uploadVehicleImage(MultipartFile file) throws IOException {
        String FILE_PATH = MEDIA_PATH + "vehicle/" + file.getOriginalFilename();

        Image img = new Image();
        img.setName(file.getOriginalFilename());
        img.setType(file.getContentType());
        img.setFilePath(FILE_PATH);
        Image image = repository.save(img);

        file.transferTo(new File(FILE_PATH));

        if (img != null){
            return FILE_PATH;
        }
        return null;
    }

    public byte[] downloadImageFromFileSystem(String name) throws IOException {
        Optional<Image> image = repository.findByName(name);
        String path = image.get().getFilePath();
        byte[] img = Files.readAllBytes(new File(path).toPath());
        return img;
    }

}
