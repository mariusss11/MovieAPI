package com.movieflex.controllers;

import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        Authentication authentication =
                SecurityContextHolder.getContext().
                        getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Map<String, Object> profile = new HashMap<>();
        profile.put("username", userDetails.getUsername());
        profile.put("roles", userDetails.getAuthorities().stream()
                        .map(item -> item.getAuthority())
                        .collect(Collectors.toList())
        );

        profile.put("message", "Hello, " + userDetails.getUsername() + "!");
        return ResponseEntity.ok(profile);


    }
}
