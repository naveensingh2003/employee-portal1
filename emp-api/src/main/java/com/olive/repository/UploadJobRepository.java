package com.olive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.olive.entity.UploadJob;

@Repository
public interface UploadJobRepository  extends JpaRepository<UploadJob, String>{

}
