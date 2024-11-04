package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ProjectDTO;
import com.example.demo.dto.TicketsDTO;
import com.example.demo.model.Employee;
import com.example.demo.model.Project;
import com.example.demo.model.Ticket;
import com.example.demo.repository.IProjectRepository;
import com.example.demo.service.ITicketService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/tester/home")
@CrossOrigin(origins ="http://localhost:4200")
public class TicketController {
	
	@Autowired
	ITicketService service;
	
	@Autowired
	HttpSession session;
	
	@Autowired
	IProjectRepository pRepo;
	
	
	@PostMapping("/registerTicket")
	public ResponseEntity<String> registerTickett(@RequestBody TicketsDTO ticketdto,@RequestParam Integer projectId)
	{
		
		String registerTicket = service.registerTicket(ticketdto,projectId);
		return new ResponseEntity<String>(registerTicket,HttpStatus.OK);
	} 
	
	@GetMapping("/showAllAvailableTickets")
	public ResponseEntity<List<TicketsDTO>> showAllAvailableTickets(@RequestParam Integer projectId)
	{
		List<TicketsDTO> list = service.showAllActiveTickets(projectId);
		return new ResponseEntity<List<TicketsDTO>>(list,HttpStatus.OK);
	}
	
	@GetMapping("/getAllTickets")
	public ResponseEntity<List<Ticket>> showAllTicketss()
	{
		List<Ticket> list = service.showAllTickets();
		return new ResponseEntity<List<Ticket>>(list,HttpStatus.OK);
	}
	
	@PostMapping("/assignTicket")
	public ResponseEntity<String> assignTicket(@RequestParam("ticketId") Integer ticketId,@RequestParam("employeeId") Integer employeeId,@RequestParam("projectId") Integer projectId)
	{
		String assignTicketToEmployee = service.assignTicketToEmployee(ticketId,employeeId,projectId );
		return new ResponseEntity<String>(assignTicketToEmployee,HttpStatus.OK) ;
	}
	
	@GetMapping("/getTesterProfile")
	public Employee testerProfile(@RequestParam String empName,@RequestParam String empPass) {
	 
	 Employee showTesterProfile = service.showTesterProfile(empName,empPass);
		return showTesterProfile;
	}
	
	@GetMapping("/getAvailableDevelopers")
	public List<Employee> getEmps(@RequestParam Integer projectId)
	{
		List<Employee> showAllActiveDevelopers = service.showAllActiveDevelopers(projectId);
		return showAllActiveDevelopers;
		
	}
	
	@DeleteMapping("/deleteTicketById")
	public ResponseEntity<String> deleteTicketById(@RequestParam("ticketId") Integer ticketId)
	{
		ResponseEntity<String> deleteTicketByIdIfCompleted = service.deleteTicketByIdIfCompleted(ticketId);
		return deleteTicketByIdIfCompleted;
	}
	
	@PostMapping("/pSave")
	public String createProject(@RequestBody ProjectDTO p)
	{
		
		Project pp = new Project();
		BeanUtils.copyProperties(p, pp);
		Project save = pRepo.save(pp);
		return save.toString();
	}
	
	@GetMapping("/getProjectsOfTester")
	public List<Project> getTesterProjects(@RequestParam Integer testerId)
	{
		List<Project> showTesterProjects = service.showTesterProjects(testerId);
		return showTesterProjects;
	}
	
	
	
}
