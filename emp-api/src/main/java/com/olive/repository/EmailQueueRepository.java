package com.olive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.olive.entity.EmailQueue;

public interface EmailQueueRepository extends JpaRepository<EmailQueue, Long> {
	
	List<EmailQueue> findTop10ByStatusAndRetryCountLessThanOrderByIdAsc(
            String status,
            Integer retryCount
    );

}
