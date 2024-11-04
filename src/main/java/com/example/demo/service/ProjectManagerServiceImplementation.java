package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.OrganisationDTO;
import com.example.demo.dto.ProjectDTO;
import com.example.demo.dto.TicketsDTO;
import com.example.demo.model.Employee;
import com.example.demo.model.Organisation;
import com.example.demo.model.Project;
import com.example.demo.model.Ticket;
import com.example.demo.repository.IEmployeeRepository;
import com.example.demo.repository.IOrganisationRepository;
import com.example.demo.repository.IProjectRepository;
import com.example.demo.repository.ITicketRepository;

import jakarta.servlet.http.HttpSession;

@Service("ProjectManagerServiceImplementation")
public class ProjectManagerServiceImplementation implements IProjectManagerService {
@Autowired
private IEmployeeRepository eRepo;
@Autowired
private	IProjectRepository pRepo;
@Autowired
private	ITicketRepository tRepo;
@Autowired
private	IOrganisationRepository oRepo;
@Autowired
private HttpSession session;
	@Override
	public String registerProject(Project project) {
		
		Integer projectId = pRepo.save(project).getProjectId();
		return "project is registerd"+projectId;
	}

	@Override
	public List<ProjectDTO> showAllProjects() {
		List<Project> entity=pRepo.findAll();
		List<ProjectDTO> dto=new ArrayList<>();
		for(Project all:entity)
		{
			ProjectDTO project=new ProjectDTO();
			BeanUtils.copyProperties(all,project);
			dto.add(project);
		}
		return dto;
	}

	


	@Override
	public String registerEmployee(EmployeeDTO dto) {
		Employee profile=new Employee();
		BeanUtils.copyProperties(dto, profile);
		Integer employeeId = eRepo.save(profile).getEmployeeId();
		return "employee is registerd with id:"+employeeId;
	}

	@Override
	public List<EmployeeDTO> showAllEmployees() {
		List<Employee> entity=eRepo.findAll();
		List<EmployeeDTO> dto=new ArrayList<>();
		for(Employee all:entity)
		{
			EmployeeDTO employee=new EmployeeDTO();
			BeanUtils.copyProperties(all,employee);
			dto.add(employee);
		}
		return dto;
	}

	@Override
	public String registerTicket(TicketsDTO dto) {
		Ticket t= new Ticket();
		BeanUtils.copyProperties(dto, t);
		Integer ticketId = tRepo.save(t).getTicketId();
		return "ticket is registered with id:"+ticketId;
	}

	@Override
	public List<TicketsDTO> showAllTickets() {
		List<Ticket> entity=tRepo.findAll();
		List<TicketsDTO> dto=new ArrayList<>();
		for(Ticket all:entity)
		{
			TicketsDTO project=new TicketsDTO();
			BeanUtils.copyProperties(all,project);
			dto.add(project);
		}
		return dto;
	}

	@Override
	public Organisation showProjectManager() {
//		session.setAttribute("name","Emily Clark");
//		session.setAttribute("password","123");
//		String name=(String)session.getAttribute("name");
	 Organisation organisation = oRepo.findAll().get(0);
	OrganisationDTO dt=new OrganisationDTO();
//	BeanUtils.copyProperties(organisation,dt);
		return organisation;
	}

	@Override
	public String registerorganisation(OrganisationDTO dto) {
		System.out.println(dto.getProjectManagerName());
		Organisation os=new Organisation();
		BeanUtils.copyProperties(dto,os);
		 Integer id=oRepo.save(os).getOrganisationId();
		 return "saves with"+id;
	}

	@Override
	public Project AssignProjectToEMployee(Integer id, List<Employee> emp) {
		Project proj = pRepo.findById(id).get();
		
		for(Employee e:emp) {
			e.setIsEmployeeAvailable(false);
		}
           proj.setEmployees(emp);
           proj.setIsProjectAvailable(false);          
           Project save = pRepo.save(proj);
		return save;
	}
	
public boolean login(String projectManagerName,String projectManagerPassword) {
		
		if(oRepo.findByProjectManagerName(projectManagerName)!=null)
		{
			Organisation dto = oRepo.findByProjectManagerName(projectManagerName);
			
			if((dto.getProjectManagerPassword().equals(projectManagerPassword)) && dto.getProjectManagerName().equals(projectManagerName))
			{
				System.out.println("All matched");
			//	session.setAttribute("name",projectManagerName);
				//session.setAttribute("password",projectManagerPassword);
				//System.out.println(dto.getAdmin_id());
				
				return true;
			}
			
			else {
				System.out.println("all not matched");
				return false;
			}
		}
		else
		{
			System.out.println("All not matched");
			return false;
		}
	}

@Override
public String deleteProject(Integer id) {
	// TODO Auto-generated method stub
	Project project = pRepo.findById(id).get();
	String s="";
	
	if(!project.getIsProjectAvailable())
	{
		s="Project is Still under development...!!Can't be deleted";
		return s;
	} 
	else
	{
		List<Employee> employees = project.getEmployees();
		for(Employee e:employees) {
			e.setIsEmployeeAvailable(true);
			e.setTickets(null);
			eRepo.save(e);
		}
		
		pRepo.deleteById(id)
;
		
		return "project deleted";
	}
}

@Override
public String  assignProjectToTester(Integer pid, List<Employee> emp) {
	Project project = pRepo.findById(pid).get();
	List<Employee> employees = project.getEmployees();
	int c=0;
	emp.forEach(tester->
	{
		tester.setIsEmployeeAvailable(false);
	     eRepo.save(tester);
	});
	
	for(Employee e:employees) {
		if(e.getCount()==3) {
			c++;
			e.setIsEmployeeAvailable(true);
		}
	}
		if(c==project.getAssignCount()) {
			project.setIsProjectAvailable(true);
			emp.forEach(tester->
			{
				tester.setIsEmployeeAvailable(false);
				project.getEmployees().add(tester);
			});
			
			pRepo.save(project);
			return "project is assign";
			
		}
	
	return "project can't assign ";
}

@Override
public String deleteEmployee(Integer id) {
	List<Project> all = pRepo.findAll();
	Employee employee = eRepo.findById(id).get();
	for(Project p:all) {
		if(p.getEmployees().contains(employee)) {
			return "Employee is Working in a Project...!!Cant Remove Employee";
		}
	}
		eRepo.deleteById(id)
;
	return "employee deleted";
}


}
