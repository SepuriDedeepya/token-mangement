package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.model.Employee;
import com.example.demo.repository.IEmployeeRepository;
import com.example.demo.service.IEmployeeService;

@RestController
@RequestMapping("/organisation/login")
@CrossOrigin(origins ="http://localhost:4200")
public class EmployeeController {

@Autowired
IEmployeeService service;

@Autowired
IEmployeeRepository repo;




}
