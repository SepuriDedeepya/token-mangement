package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.TicketAtLoginDTO;
import com.example.demo.model.Ticket;

@Repository
public interface ITicketRepository extends JpaRepository<Ticket, Integer> {
	
	public List<Ticket> findByShowTicket(Boolean isTicketActive);
	@Query(value = "SELECT * FROM ticket t JOIN project_tickets pt ON t.ticket_id = pt.tickets_ticket_id WHERE pt.project_project_id = :projectId",nativeQuery = true)
	public List<Ticket> getTicketsByPRojectId(Integer projectId);
	
	////////
	//developer
		public  List<Ticket> findByTicketAssignTo(String employeeName);
//		@Query(value="select * from ticket t where t.ticket_assign_to=:ticketAssignTo && e.status=5",nativeQuery=true)
//		 public List<Ticket> findByStatus(@Param("ticketAssignTo")String ticketAssignTo);
		 @Query("SELECT new com.example.demo.dto.TicketAtLoginDTO(t.ticketId, t.ticketName, t.status,t.ticketUpdatedDate) " +
		           "FROM Ticket t WHERE t.status = 5 AND t.ticketAssignTo = :employeeName")
		    List<TicketAtLoginDTO> findCompletedTicketsByUsername(String employeeName);
}
