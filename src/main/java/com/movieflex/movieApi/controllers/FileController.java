package com.movieflex.movieApi.controllers;

import com.movieflex.movieApi.service.FileService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/file/")
public class FileController {

//    TODO: look at what i've created on youtube

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    final String path = "posters";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFileHandler(@RequestBody MultipartFile file) throws IOException {

        String uploadFileName = fileService.uploadFile(path, file);
        return ResponseEntity.ok("File uploaded : " + uploadFileName);
    }

    @GetMapping("/{fileName}")
    public void serverFileHandler(@PathVariable String fileName, HttpServletResponse response) throws IOException {
        InputStream resourcesFile = fileService.getResourceFile(path, fileName);
        response.setContentType(MediaType.IMAGE_PNG_VALUE);
        StreamUtils.copy(resourcesFile, response.getOutputStream());
    }
}
