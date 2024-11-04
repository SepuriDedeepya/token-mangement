package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProjectAtLoginDTO 
{
	private Integer projectId;
	private String projectName;
	private Integer action;
}
