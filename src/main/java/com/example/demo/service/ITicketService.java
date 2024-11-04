package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dto.TicketsDTO;
import com.example.demo.model.Employee;
import com.example.demo.model.Project;
import com.example.demo.model.Ticket;

@Service
public interface ITicketService{
	public List<TicketsDTO> showAllActiveTickets(Integer projectId);
	public String registerTicket(TicketsDTO dto,Integer projectId);
	public String assignTicketToEmployee(Integer ticketId,Integer employeeId,Integer projectId);
	public Employee showTesterProfile(String userName,String password);
	public List<Employee> showAllActiveDevelopers(Integer projectId);
	public List<Ticket> showAllTickets();
	public ResponseEntity<String> deleteTicketByIdIfCompleted(Integer ticketID); 
	public  List<Project> showTesterProjects(Integer testerId);
}
