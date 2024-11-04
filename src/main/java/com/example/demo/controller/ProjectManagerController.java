package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.OrganisationDTO;
import com.example.demo.dto.ProjectDTO;
import com.example.demo.dto.TicketsDTO;
import com.example.demo.model.Employee;
import com.example.demo.model.Organisation;
import com.example.demo.model.Project;
import com.example.demo.service.IProjectManagerService;

@RestController
@RequestMapping("/organisation/projectManagerlogin/home")
@CrossOrigin(origins = "http://localhost:4200/")
public class ProjectManagerController {
	@Autowired
	private IProjectManagerService service;
	
	
	@PostMapping("/registerProject")
	public ResponseEntity<String> registerProject(@RequestBody Project project)
	{
		try
		{
			String register = service.registerProject(project);
			return new ResponseEntity<String>(register,HttpStatus.OK);
		}
		catch(Exception e)
		{
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/showAllProject")
	public List<ProjectDTO> showAllProject()
	{
		return service.showAllProjects();
	}
	
	@PostMapping("/registerEmployee")
	public ResponseEntity<String> registerEmployee(@RequestBody EmployeeDTO dto)
	{
		try
		{
			String registerActor = service.registerEmployee(dto);
			return new ResponseEntity<String>(registerActor,HttpStatus.OK);
		}
		catch(Exception e)
		{
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/showAllTicket")
	public ResponseEntity<List<TicketsDTO>> showAllTickets()
	{
		
			List<TicketsDTO> list = service.showAllTickets();
			return new ResponseEntity<List<TicketsDTO>>(list,HttpStatus.OK);
			
	}
	
	@GetMapping("/getProjectmanagerDetails")
	public ResponseEntity<Organisation> showProjectManagerDetails() {
		Organisation showProjectManager = service.showProjectManager();
		return new ResponseEntity<Organisation>(showProjectManager,HttpStatus.OK); 
	}
	 
	@GetMapping("/showAllEmployee")
	public ResponseEntity<List<EmployeeDTO>> showAllEmployee()
	{
		
			List<EmployeeDTO> list = service.showAllEmployees();
			return new ResponseEntity<List<EmployeeDTO>>(list,HttpStatus.OK);
			
	}
	
	@PostMapping("/registermanager")
	public ResponseEntity<String> registerprojectmanager(@RequestBody OrganisationDTO deto)
	{
		
			String showProjectManager = service.registerorganisation(deto);
			return new ResponseEntity<String>(showProjectManager,HttpStatus.OK);
			
	}
	
	@PostMapping("/assignProject/{projectId}")
	public ResponseEntity<Project> assignProjectToEMployee(@PathVariable Integer projectId,@RequestBody List<Employee> employees) 
	{ 
		System.out.println(projectId);
		System.out.println(employees);
		Project assignProjectToEMployee = service.AssignProjectToEMployee(projectId, employees);
		return new ResponseEntity<Project>(assignProjectToEMployee,HttpStatus.OK);
		
		
	}
	@PostMapping("/projectManagerlogin")
	public ResponseEntity<String> login(@RequestParam("project_manager_name") String projectManagerName,@RequestParam("project_manager_password") String projectManagerPassword)
	{
		if(service.login(projectManagerName, projectManagerPassword)==true) {
			return new ResponseEntity<String>("Welcome to Profile "+projectManagerName,HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<String>("Sorry, Invalid ",HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/deleteproject/{id}")
	public ResponseEntity<String> deleteProject(@PathVariable Integer id){
		String deleteProject = service.deleteProject(id)
;
		return new ResponseEntity<String>(deleteProject,HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteemployee/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable Integer id){
		String deleteEmployee = service.deleteEmployee(id)
;
		return new ResponseEntity<String>(deleteEmployee,HttpStatus.OK);
	}
	
	@PostMapping("/assignToTester/{projectId}")
    public ResponseEntity<String> assignProjectToTester(
            @PathVariable Integer projectId,
            @RequestBody List<Employee> employees) {
        String result = service.assignProjectToTester(projectId, employees);
        return ResponseEntity.ok(result);
    }
}
