package com.javaadvanced.mehdi.shortBustProject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings ( CorsRegistry registry ) {
        registry.addMapping( "/**" ) // Define the path you want to enable CORS for
                .allowedOrigins( "*" )
                .allowedMethods( "*" )
                .allowedHeaders( "*" ); // Set your frontend URL
    }
    
}
