package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Employee;

public interface IEmployeeRepository extends JpaRepository<Employee, Integer> {
// public Employee findByEmployeeNameAndEmployeePassword(String userName,String password);
 
 public Employee findByEmployeeNameAndEmployeePassword(String empName,String password);
 public Employee findByEmployeeName(String empName);
 public List<Employee> findByEmployeeDesignationAndIsEmployeeAvailable(String designation,Boolean isAvailable);
 
 @Query(value="select * from employee e where e.employee_name=:employeeName && e.employee_designation='tester'",nativeQuery=true)
	public Employee findByEmployeeTesterName(@Param("employeeName") String employeeName );
 
 ////////////////
 @Query(value="select * from employee e where e.employee_name=:employeeName && e.employee_designation='developer'",nativeQuery=true)
	public Employee findByEmployeeDeveloperName(@Param("employeeName") String employeeName );
 
 //public Employee findEmployeeByAvailability();
 
 @Modifying
 @Query(value = "DELETE FROM employee_tickets WHERE tickets_ticket_id = :ticketId", nativeQuery = true)
 public void deleteEmployeeTicketById(Integer ticketId);

 @Modifying
 @Query(value = "DELETE FROM employee WHERE employee_id IN (SELECT employee_employee_id FROM employee_tickets WHERE tickets_ticket_id = :ticketId)", nativeQuery = true)
 public void deleteEmployeeByTicketId(Integer ticketId);
 
 
 
}
