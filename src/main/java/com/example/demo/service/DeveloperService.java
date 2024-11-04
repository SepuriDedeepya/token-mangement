package com.example.demo.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.EmployeeDetailsDTO;
import com.example.demo.dto.EmployeeLoginDTO;
import com.example.demo.dto.ProjectAtLoginDTO;
import com.example.demo.dto.ProjectDTO;
import com.example.demo.dto.TicketAtLoginDTO;
import com.example.demo.dto.TicketsDTO;
import com.example.demo.model.Employee;
import com.example.demo.model.Project;
import com.example.demo.model.Ticket;
import com.example.demo.repository.IEmployeeRepository;
import com.example.demo.repository.IProjectRepository;
import com.example.demo.repository.ITicketRepository;

@Service
public class DeveloperService 
{
	@Autowired
	private IProjectRepository repo;
	
	@Autowired
	private IEmployeeRepository empRepo;
	
	@Autowired
	private ITicketRepository trepo;
	
	
//to display all projects	
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
//
	public EmployeeDetailsDTO getEmployeeDetails(String employeeName, String employeePassword) {
        Employee employee = empRepo.findByEmployeeNameAndEmployeePassword(employeeName, employeePassword);
        
        if (employee != null) {
            return new EmployeeDetailsDTO(
                    employee.getEmployeeId(),
                    employee.getEmployeeName(),
                    employee.getEmployeeDesignation(),
                    employee.getEmployeeEmail(),
                    employee.getEmployeePhoneno(),
                    employee.getCount()
            );
        }
        return null;
    }
//to display projects by name	
	public Project getProjectsByEmployee(String name, String password) {
		Employee employeeOpt = empRepo.findByEmployeeNameAndEmployeePassword(name, password);

        if (employeeOpt!=null) {
        //    Employee employee = employeeOpt.get();
            if ("developer".equalsIgnoreCase(employeeOpt.getEmployeeDesignation())) {
                return repo.findAllByEmployeesContaining(employeeOpt);
            }
        }
        return null; 
    }
//to display tickets by name of employee
	public List<TicketAtLoginDTO> getTicketsForEmployee(String employeeName, String employeePassword) {
        Employee employee = empRepo.findByEmployeeNameAndEmployeePassword(employeeName, employeePassword);
        
        List<TicketAtLoginDTO> List = new ArrayList<>();
        
        if (employee!=null) {
           // Employee emp = employee.get();
            String employeeIdentifier=employee.getEmployeeName();
            
            List<Ticket> tickets = trepo.findByTicketAssignTo(employeeIdentifier); // Assuming getTicket() returns List<Ticket>

            for (Ticket ticket : tickets) {
                TicketAtLoginDTO ticketResponse = new TicketAtLoginDTO(
                    ticket.getTicketId(), 
                    ticket.getTicketName(), 
                    ticket.getStatus(),
                    ticket.getTicketUpdatedDate()
                );
                List.add(ticketResponse);
            }
        }
        
        return List; // Return the populated list
    }
//project update method	 
	 public Employee updateProjectStatus(Integer employeeId,Integer selectedStatus)throws Exception {
	        Optional<Employee> employeeObj = empRepo.findById(employeeId);
	        if (employeeObj.isPresent()) {
	           Employee employee = employeeObj.get(); 
	           employee.setCount(selectedStatus);// Set status using integer count value
	            return empRepo.save(employee); // Save updated project
	        } else {
	            throw new Exception("Employee with ID " + employeeId + " not found");
	        }
	    }
//ticket update method	 
	 public Ticket updateTicketStatus(TicketsDTO ticketDTO)throws Exception {
	        Optional<Ticket> ticketOpt = trepo.findById(ticketDTO.getTicketId());
	        if (ticketOpt.isPresent()) {
	            Ticket ticket = ticketOpt.get();
	            ticket.setStatus(ticketDTO.getStatus());
	            ticket.setTicketUpdatedDate(LocalDate.now());
	            if(ticketDTO.getTicketEstimatedTime()!=null)
	            {
	            	ticket.setTicketEstimatedTime(ticketDTO.getTicketEstimatedTime());
	            }
	            return trepo.save(ticket);
	        } else {
	            throw new Exception("Ticket with ID " + ticketDTO.getTicketId() + " not found");
	        }
	 }
//to get completed tickets 	 
//	 public List<TicketsDTO> getCompletedTickets(EmployeeLoginDTO employeedto) {
//	        List<Ticket> completedTickets = trepo.findByStatus(employeedto.getEmployeeName()); // Assuming 5 represents 'Completed'
//	        List<TicketsDTO> completedTicketDTOs = new ArrayList<>();
//	        
//	        for (Ticket ticket : completedTickets) {
//	            //completedTicketDTOs.add(convertToDTO(ticket)); // Convert each completed Ticket to TicketDTO
//	        	TicketsDTO dto=new TicketsDTO();
//	        	BeanUtils.copyProperties(ticket, dto);
//	        	completedTicketDTOs.add(dto);
//	        }
//	        
//	        return completedTicketDTOs;
//	    }
	 public List<TicketAtLoginDTO> getCompletedTicketsForUser(String employeeName) {
	        return trepo.findCompletedTicketsByUsername(employeeName);
	    }
	 
}
