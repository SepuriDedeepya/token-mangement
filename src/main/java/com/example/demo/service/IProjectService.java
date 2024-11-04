package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.ProjectDTO;
@Service
public interface IProjectService {

	List<ProjectDTO> showAllProjects();

	String registerProject(ProjectDTO dto);

}
