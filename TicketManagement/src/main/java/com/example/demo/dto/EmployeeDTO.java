package com.example.demo.dto;

import java.util.List;

import com.example.demo.model.Ticket;

import lombok.Data;
@Data
public class EmployeeDTO {
	private Integer employeeId;

	private String employeeName;

	private String employeeDesignation;
	
	private String employeePassword;
	
	private Double employeePhoneno;
	
	private String employeeEmail;

	private Boolean isEmployeeAvailable=true;

	private List<Ticket> ticket;
}
