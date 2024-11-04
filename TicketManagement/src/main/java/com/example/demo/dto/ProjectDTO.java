package com.example.demo.dto;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.model.Employee;
import com.example.demo.model.Ticket;

import lombok.Data;

@Data
public class ProjectDTO 
{
	
private Integer projectId;
	
	private String projectName;
	
	private String projectDescription;
	
	private LocalDate creationDate;
	
	private Boolean isProjectAvailable=true;
	
	private List<Employee> employees;

	private List<Ticket> tickets;
}
