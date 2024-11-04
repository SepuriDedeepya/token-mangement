package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public interface IOrganizationService {
	public boolean login(String projectManagerName,String projectManagerPassword) ;
	public boolean loginDeveloperEmployee(String employeeName,String employeePassword);

	public boolean loginTesterEmployee(String employeeName,String employeePassword) ;
}
