package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dto.TicketsDTO;
import com.example.demo.model.Employee;
import com.example.demo.model.Project;
import com.example.demo.model.Ticket;
import com.example.demo.repository.IEmployeeRepository;
import com.example.demo.repository.IProjectRepository;
import com.example.demo.repository.ITicketRepository;

import jakarta.transaction.Transactional;
@Service
public class TicketServiceImplementation implements ITicketService{
	
	@Autowired
	ITicketRepository repo;
	@Autowired
	IEmployeeRepository empRepo;
	@Autowired
	IProjectRepository projRepo;
	public String registerTicket(TicketsDTO dto,Integer projectId)
	{
		Ticket t= new Ticket();
		BeanUtils.copyProperties(dto, t);
		t.setShowTicket(true);
		t.setStatus(1);
		t.setTicketAssignTo(null);
		
		Project project = projRepo.findById(projectId).get();
		project.getTickets().add(t);
		projRepo.save(project);
		return "Project Id: "+project.getProjectId()+" raised ticket with Id: "+t.getTicketId();
	}
	
	public List<TicketsDTO> showAllActiveTickets(Integer projectId)
	{
		
		List<Ticket> entity=repo.getTicketsByPRojectId(projectId);
		List<Ticket> tickets= new ArrayList<Ticket>();
		entity.forEach(tic->
		{
			if(tic.getShowTicket()==true)
			{
				tickets.add(tic);
			}
		});
		
		List<TicketsDTO> ticketDtoList=new ArrayList<>();
		for(Ticket tick:tickets)
		{
			TicketsDTO ticketObj=new TicketsDTO();
			BeanUtils.copyProperties(tick,ticketObj);
			ticketDtoList.add(ticketObj);
		}
		return ticketDtoList;
	}

	@Override
	public String assignTicketToEmployee(Integer ticketId,Integer employeeId,Integer projectId) {
    
		Project project = projRepo.findById(projectId).get();
		
	    Ticket ticket= repo.findById(ticketId).get();
	    Employee employee = empRepo.findById(employeeId).get();
	  
	    
	     
	     ticket.setStatus(2);
	     ticket.setShowTicket(false);
	     ticket.setTicketAssignTo(employee.getEmployeeName());
	     
//	     project.getTickets().add(ticket);
         employee.getTickets().add(ticket);
         
	     empRepo.save(employee);
	     projRepo.save(project);
	
	 
	
		return ticket.getTicketId()+" ticket is add to employee :"+employee.getEmployeeName();
	  
	}

	@Override
	public Employee showTesterProfile(String userName,String password) {
		Employee testerObj = empRepo.findByEmployeeNameAndEmployeePassword(userName,password);
		return testerObj;
	}

	@Override
	public List<Employee> showAllActiveDevelopers(Integer projectId) {
				
//		List<Employee> employeeAvailable = empRepo.findByEmployeeDesignationAndIsEmployeeAvailable("Developer",true);
//		List<String> devNames = new ArrayList<String>();
//		employeeAvailable.forEach(emp-> devNames.add(emp.getEmployeeName()));
		
		Project project = projRepo.findById(projectId).get();
		List<Employee> employees=new ArrayList<>();
		
		project.getEmployees().forEach(e-> 
		{
			if(e.getEmployeeDesignation().equalsIgnoreCase("developer"))
			{
				employees.add(e);
			}
		});
			
		return employees;
	}

	@Override
	public List<Ticket> showAllTickets() {
		List<Ticket> all = repo.findAll();
		
		return all;
	}

	@Override
	@Transactional
	public ResponseEntity<String> deleteTicketByIdIfCompleted(Integer ticketId) {
//		projRepo.deleteTicketById(ticketId);
		
//		projRepo.deleteProjectTicketById(ticketId);
//		projRepo.deleteProjectByTicketId(ticketId);
//		
//		empRepo.deleteEmployeeByTicketId(ticketId);
//		empRepo.deleteEmployeeTicketById(ticketId);
		
		this.RemoveTicketFromAll(ticketId);
		return new ResponseEntity<String>( "Ticket with id: "+ticketId+" is Deleted",HttpStatus.OK);
	}
	
	public void RemoveTicketFromAll(Integer tid) {
		Ticket ticket = repo.findById(tid).get();
		List<Project> all = projRepo.findAll();
		for(Project p:all) {
			if(p.getTickets().contains(ticket)) {
				p.getTickets().remove(ticket);
				projRepo.save(p);
; break;
			}
			
		}
		List<Employee> all2 = empRepo.findAll();
		for(Employee e:all2) {
			if(e.getTickets().contains(ticket)) {
				e.getTickets().remove(ticket);
				empRepo.save(e);
; break;
			}
		}
		repo.delete(ticket);
		
		
	}

	@Override
	public List<Project> showTesterProjects(Integer id) {
		List<Project> projectsByTesterId = projRepo.findProjectsByTesterId(id);
		return projectsByTesterId;
	}

	

}
