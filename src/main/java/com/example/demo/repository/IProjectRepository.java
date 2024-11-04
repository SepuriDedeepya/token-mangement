package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.Employee;
import com.example.demo.model.Project;

public interface IProjectRepository extends JpaRepository<Project, Integer> {
	
@Query(value = "SELECT * FROM  Project p JOIN Project_Employees pe ON p.project_id = pe.project_project_id WHERE  pe.employees_employee_id = :testerId;",nativeQuery = true)
public List<Project> findProjectsByTesterId(Integer testerId);

Project findAllByEmployeesContaining(Employee employee);


@Modifying
@Query(value = "DELETE FROM project_tickets WHERE tickets_ticket_id = :ticketId", nativeQuery = true)
public void deleteProjectTicketById(Integer ticketId);

@Modifying
@Query(value = "DELETE FROM Project WHERE project_id IN (SELECT project_project_id FROM project_tickets WHERE tickets_ticket_id = :ticketId)", nativeQuery = true)
public void deleteProjectByTicketId(Integer ticketId);

}
