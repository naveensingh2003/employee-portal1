package com.olive.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;


import com.olive.entity.Employee;

@Repository
public interface IEmployeeRepo extends JpaRepository<Employee, Integer> ,JpaSpecificationExecutor<Employee>{
	
	public List<Employee> findByJobId(String jobId);
}
