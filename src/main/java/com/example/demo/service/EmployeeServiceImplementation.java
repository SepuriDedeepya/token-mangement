package com.example.demo.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.model.Employee;
import com.example.demo.repository.IEmployeeRepository;
@Service
public class EmployeeServiceImplementation implements IEmployeeService{

	@Autowired
	IEmployeeRepository repo;
	
	public String registerEmployee( EmployeeDTO dto)
	{
		Employee profile=new Employee();
		dto.setTicket(null);
		dto.setIsEmployeeAvailable(true);
		BeanUtils.copyProperties(dto, profile);
		Integer employeeId = repo.save(profile).getEmployeeId();
		return "employee is registerd with id:"+employeeId;
	}
	

}
