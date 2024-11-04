package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.EmployeeDTO;
@Service
public interface IEmployeeService {

	String registerEmployee(EmployeeDTO dto);
}
