package com.example.bookitnowbackend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final String avatarDirectory;
    @Autowired
    public WebMvcConfig(@Value("${avatar.directory.path}") String avatarDirectory) {
        this.avatarDirectory = "file:" + avatarDirectory;
        System.out.println("AVATAR DIRECTORY:" + this.avatarDirectory);
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/avatars/**")
                .addResourceLocations(avatarDirectory);
    }
}
