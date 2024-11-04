package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProjectDTO;
import com.example.demo.model.Employee;
import com.example.demo.model.Project;
import com.example.demo.repository.IEmployeeRepository;
import com.example.demo.repository.IProjectRepository;

@Service
public class ProjectServiceImplementation implements IProjectService {
	
	IProjectRepository repo;
	IEmployeeRepository empRepo;
	public String registerProject(ProjectDTO dto)
	{
		Project mini=new Project();
		BeanUtils.copyProperties(dto, mini);
		Integer projectId = repo.save(mini).getProjectId();
			
		return "project is registerd"+projectId;
	}
	
	public List<ProjectDTO> showAllProjects()
	{
		List<Project> entity=repo.findAll();
		List<ProjectDTO> dto=new ArrayList();
		for(Project all:entity)
		{
			ProjectDTO project=new ProjectDTO();
			BeanUtils.copyProperties(all,project);
			dto.add(project);
		}
		return dto;
	}
}
