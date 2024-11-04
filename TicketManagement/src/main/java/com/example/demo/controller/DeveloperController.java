
package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EmployeeDetailsDTO;
import com.example.demo.dto.EmployeeLoginDTO;
import com.example.demo.dto.ProjectAtLoginDTO;
import com.example.demo.dto.TicketAtLoginDTO;
import com.example.demo.dto.TicketsDTO;
import com.example.demo.model.Employee;
import com.example.demo.model.Project;
import com.example.demo.model.Ticket;
import com.example.demo.service.DeveloperService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("organisation/developerlogin/Home")
public class DeveloperController 
{
	@Autowired
	DeveloperService service;
	
// to display projects for employee by name
	@PostMapping("/projects")
	public ResponseEntity<ProjectAtLoginDTO> getProjectsForEmployee(@RequestBody EmployeeLoginDTO login) {
	    Project projects = service.getProjectsByEmployee(login.getEmployeeName(), login.getEmployeePassword());

	    if (projects!=null) {
	    	ProjectAtLoginDTO dto=new ProjectAtLoginDTO(projects.getProjectId(),projects.getProjectName(),projects.getAction());
	        return ResponseEntity.ok(dto);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}

//to display tickets by employee name
	@PostMapping("/Tickets")
    public ResponseEntity<List<TicketAtLoginDTO>> getTicketsForEmployee(@RequestBody EmployeeLoginDTO loginDTO) {
        List<TicketAtLoginDTO> tickets = service.getTicketsForEmployee(loginDTO.getEmployeeName(), loginDTO.getEmployeePassword());
        
        if (!tickets.isEmpty()) {
            return ResponseEntity.ok(tickets);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
//to show user details in their interface
	@PostMapping("/getEmployeeDetails")
    public ResponseEntity<EmployeeDetailsDTO> getEmployeeDetails(@RequestBody EmployeeLoginDTO loginDTO) {
	
        EmployeeDetailsDTO employeeDetails = service.getEmployeeDetails(loginDTO.getEmployeeName(), loginDTO.getEmployeePassword());
       
        if (employeeDetails != null) {
            return ResponseEntity.ok(employeeDetails);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
//project update method	
	@PutMapping("/update-project-status")
	 public ResponseEntity<Employee> updateProjectStatus(@RequestParam("employeeId") Integer employeeId,@RequestParam("selectedStatus") Integer selectedStatus) {
	        try {
	            Employee updateProjectStatus = service.updateProjectStatus(employeeId,selectedStatus);
	            return ResponseEntity.ok(updateProjectStatus);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }

	    }
//ticket update method	
	@PutMapping("/update-ticket-status")
    public ResponseEntity<Ticket> updateTicketStatus(@RequestBody TicketsDTO ticketDTO) {
        try {
            Ticket updatedTicket = service.updateTicketStatus(ticketDTO);
            return ResponseEntity.ok(updatedTicket);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
//completed tickets of that employee 	
//	@PostMapping("/completed")
//    public ResponseEntity<List<TicketsDTO>> getCompletedTickets(@RequestBody EmployeeLoginDTO loginDTO) {
//        List<TicketsDTO> completedTickets = service.getCompletedTickets(loginDTO);
//        return ResponseEntity.ok(completedTickets);
//    }
	@PostMapping("/completed")
    public ResponseEntity<List<TicketAtLoginDTO>> getCompletedTickets(@RequestBody EmployeeLoginDTO loginDTO) {
        List<TicketAtLoginDTO> completedTickets = service.getCompletedTicketsForUser(loginDTO.getEmployeeName());
        return ResponseEntity.ok(completedTickets);
    }
}
