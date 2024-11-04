package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.OrganisationDTO;
import com.example.demo.dto.ProjectDTO;
import com.example.demo.dto.TicketsDTO;
import com.example.demo.model.Employee;
import com.example.demo.model.Organisation;
import com.example.demo.model.Project;

public interface IProjectManagerService {
	public String registerProject(Project project);
	public List<ProjectDTO> showAllProjects();
	public Project AssignProjectToEMployee(Integer id,List<Employee> emp);
	public String registerEmployee(EmployeeDTO dto);
	public List<EmployeeDTO> showAllEmployees();
	public String registerTicket(TicketsDTO dto);
	public List<TicketsDTO> showAllTickets();
	public Organisation showProjectManager();
	public String registerorganisation(OrganisationDTO dto);
	public boolean login(String projectManagerName,String projectManagerPassword);
	public String deleteProject(Integer id);
	public String deleteEmployee(Integer id);
	public String assignProjectToTester(Integer pid,List<Employee>emp);
}
