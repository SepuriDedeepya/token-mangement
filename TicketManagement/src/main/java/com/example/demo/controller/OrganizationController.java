package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EmployeeLoginDTO;
import com.example.demo.dto.OrganisationDTO;
import com.example.demo.repository.IEmployeeRepository;
import com.example.demo.service.OrganizationServiceImplementation;

@RestController
	@RequestMapping("organisation")
	@CrossOrigin(origins="http://localhost:4200")
	public class OrganizationController {
		@Autowired
		OrganizationServiceImplementation service;
			
		@Autowired
		IEmployeeRepository empRepo;
		///////
		@PostMapping("/projectManagerlogin")
		public ResponseEntity<OrganisationDTO> login(@RequestParam("project_manager_name") String projectManagerName,@RequestParam("project_manager_password") String projectManagerPassword)
		{	
			OrganisationDTO orgDetails=new OrganisationDTO();
			if(service.login(projectManagerName, projectManagerPassword)==true) {
				
				orgDetails.setProjectManagerName(projectManagerName);
				orgDetails.setProjectManagerPassword(projectManagerPassword);
				return new ResponseEntity<OrganisationDTO>(orgDetails,HttpStatus.OK);
			}
			else
			{
				return new ResponseEntity<OrganisationDTO>(orgDetails,HttpStatus.BAD_REQUEST);
			}
		}
		///// developer log in page 
		@PostMapping("/developerlogin")
		public ResponseEntity<EmployeeLoginDTO> loginDeveloper(@RequestParam("employeeName") String employeeName,@RequestParam("employeePassword") String employeePassword)
		{
			EmployeeLoginDTO empDetails=new EmployeeLoginDTO();
			if(service.loginDeveloperEmployee(employeeName, employeePassword)==true) {
				empDetails.setEmployeeName(employeeName);
				empDetails.setEmployeePassword(employeePassword);
				return new ResponseEntity<EmployeeLoginDTO>(empDetails,HttpStatus.OK);
			}
			else
			{
				return new ResponseEntity<EmployeeLoginDTO>(empDetails,HttpStatus.BAD_REQUEST);
			}
		}
		
		
		@PostMapping("/testerlogin")
		public ResponseEntity<EmployeeLoginDTO> loginTester(@RequestParam("employeeName") String employeeName,@RequestParam("employeePassword") String employeePassword)
		{
			EmployeeLoginDTO empDetails=new EmployeeLoginDTO();
			if(service.loginTesterEmployee(employeeName, employeePassword)==true) {
				empDetails.setEmployeeName(employeeName);
				empDetails.setEmployeePassword(employeePassword);
				return new ResponseEntity<EmployeeLoginDTO>(empDetails,HttpStatus.OK);
			}
			else
			{
				return new ResponseEntity<EmployeeLoginDTO>(empDetails,HttpStatus.BAD_REQUEST);
			}
		}
		
}
