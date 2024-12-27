package com.maven.pos.services.impl;

import com.maven.pos.entities.Item;
import com.maven.pos.repositories.ItemRepository;
import com.maven.pos.services.IItemService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class ItemServiceImpl implements IItemService {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private S3Client s3Client;

    @Value("${image.upload.dir}")
    private String imageUploadDir;

    @Override
    public Item addItem(Item item, MultipartFile imageFile) throws IOException {

//        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
//        String filePath = Paths.get(imageUploadDir, uniqueFileName).toString();
//
//        // Save the file to the specified directory
//        Files.createDirectories(Paths.get(imageUploadDir)); // Ensure the directory exists
//        file.transferTo(new File(filePath));
//
//        item.setImageName(uniqueFileName);

        String imageName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();

        File file = convertMultipartFileToFile(imageFile);
        String bucketName = "springboot-test-0076";

        // Upload file to S3
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(imageName)
                .build();

        PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));

        file.delete(); // Remove temporary file after upload

        // Get S3 URL
        String imageUrl = String.format("https://%s.s3.amazonaws.com/%s", bucketName, imageName);

        item.setImageUrl(imageUrl);
        item.setDate(LocalDate.now());
        item.setTime(LocalTime.now());

        return itemRepository.save(item);
    }

    private File convertMultipartFileToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return convFile;
    }

    @Override
    public List<Item> getAllItems() {

        return itemRepository.findAll();

    }

    @Override
    public Item getItemById(Item item) {
        return itemRepository.findById(item.getItemId()).get();
    }


    @Override
    public Item deleteItem(Long itemId) {
        Optional<Item> itemOptional = itemRepository.findById(itemId);

        String imageName = itemOptional.get().getImageUrl().substring(
                itemOptional.get().getImageUrl().lastIndexOf('/') + 1);

        // Delete the image from S3
        s3Client.deleteObject(DeleteObjectRequest.builder()
                .bucket("springboot-test-0076")
                .key(imageName)
                .build());

        if (itemOptional.isPresent()) {
            Item item = itemOptional.get();
            itemRepository.deleteById(itemId);
            return item;
        } else {
            throw new RuntimeException("Item not found with id: " + itemId);
        }
    }


    @Override
    public Item updateItem(Item item,MultipartFile imageFile) throws IOException {
        Item it=itemRepository.findById(item.getItemId()).get();

        if (!imageFile.isEmpty()){
            String imageName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();

            File file = convertMultipartFileToFile(imageFile);
            String bucketName = "springboot-test-0076";

            // Upload file to S3
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(imageName)
                    .build();

            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));

            file.delete(); // Remove temporary file after upload

            // Get S3 URL
            String imageUrl = String.format("https://%s.s3.amazonaws.com/%s", bucketName, imageName);
            it.setImageUrl(imageUrl);
        }
        String uniqueFileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
        String filePath = Paths.get(imageUploadDir, uniqueFileName).toString();

        // Save the file to the specified directory
        Files.createDirectories(Paths.get(imageUploadDir)); // Ensure the directory exists
        imageFile.transferTo(new File(filePath));

        it.setItemName(item.getItemName());
        it.setItemPrice(item.getItemPrice());


        return itemRepository.save(it);
    }

}
