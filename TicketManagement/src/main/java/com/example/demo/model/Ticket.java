package com.example.demo.model;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
public class Ticket {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer ticketId;
	@NonNull
	private String ticketName;
	@NonNull
	private String ticketDescription;
	
	private String ticketAssignTo;

	@CreationTimestamp
	private  LocalDate ticketCreatedDate;
	private  LocalDate ticketUpdatedDate;
	
	private Integer ticketEstimatedTime;
	
	private Boolean showTicket=true;
	private Integer status=1;
}
