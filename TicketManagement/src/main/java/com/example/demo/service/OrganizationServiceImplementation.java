package com.example.demo.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.OrganisationDTO;
import com.example.demo.model.Employee;
import com.example.demo.model.Organisation;
import com.example.demo.repository.IEmployeeRepository;
import com.example.demo.repository.IOrganisationRepository;

@Service
public class OrganizationServiceImplementation implements IOrganizationService{
	@Autowired
	IEmployeeRepository erepository;
	
	@Autowired
	IOrganisationRepository orepository;
	
	@Autowired
	ModelMapper modelMapper;
	
	
	public OrganisationDTO entityToDto (Organisation data)
	{
		OrganisationDTO dto= modelMapper.map(data,OrganisationDTO.class);
		return dto;
	}
	
	public EmployeeDTO entityToDtoOfEmployee (Employee data)
	{
		EmployeeDTO dto= modelMapper.map(data,EmployeeDTO.class);
		return dto;
	}
	public boolean loginTesterEmployee(String employeeName,String employeePassword) {
		if(erepository.findByEmployeeTesterName(employeeName)!=null)
		{
			EmployeeDTO dto=entityToDtoOfEmployee(erepository.findByEmployeeTesterName(employeeName));
			if((dto.getEmployeePassword().equals(employeePassword)) && dto.getEmployeeName().equals(employeeName))
			{
				System.out.println("All matched");		
				return true;
			}
			
			else {
				System.out.println("all not matched");
				return false;
			}
		}
		else
		{
			System.out.println("All not matched");
			return false;
		}
	}
	
	//////////////
	

	public boolean login(String projectManagerName,String projectManagerPassword) {
	
		if(orepository.findByProjectManagerName(projectManagerName)!=null)
		{
			OrganisationDTO dto= entityToDto(orepository.findByProjectManagerName(projectManagerName));
			System.out.println(dto.toString());
			if((dto.getProjectManagerPassword().equals(projectManagerPassword)) && dto.getProjectManagerName().equals(projectManagerName))
			{
				System.out.println("All matched");
			//	session.setAttribute("name",projectManagerName);
				//session.setAttribute("password",projectManagerPassword);
				//System.out.println(dto.getAdmin_id());
				
				return true;
			}
			
			else {
				System.out.println("all not matched");
				return false;
			}
		}
		else
		{
			System.out.println("All not matched");
			return false;
		}
	}
	
public boolean loginDeveloperEmployee(String employeeName,String employeePassword) {
		
		if(erepository.findByEmployeeDeveloperName(employeeName)!=null)
		{
			EmployeeDTO dto=entityToDtoOfEmployee(erepository.findByEmployeeDeveloperName(employeeName));
			System.out.println(dto);
			if((dto.getEmployeePassword().equals(employeePassword)) && dto.getEmployeeName().equals(employeeName))
			{
				System.out.println("All matched");
			//	session.setAttribute("name",employee_name);
				//session.setAttribute("password",projectManagerPassword);
				//System.out.println(dto.getAdmin_id());
				
				return true;
			}
			
			else {
				System.out.println("all not matched");
				return false;
			}
		}
		else
		{
			System.out.println("All not matched");
			return false;
		}
	}
	
}
