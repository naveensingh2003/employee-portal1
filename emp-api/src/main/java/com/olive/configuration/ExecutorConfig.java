package com.olive.configuration;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ExecutorConfig {

    @Bean
    public ExecutorService emailExecutor() {

        return Executors.newFixedThreadPool(2);

    }
}
