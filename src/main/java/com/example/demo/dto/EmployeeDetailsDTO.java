package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDetailsDTO 
{
	private Integer employeeId;
	private String employeeName;
	private String employeeDesignation;
	private String employeeEmail;
	private Double employeePhoneno;
	private Integer count;
}
