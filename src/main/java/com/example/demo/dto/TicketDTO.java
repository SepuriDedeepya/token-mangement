package com.example.demo.dto;

import java.time.LocalDate;

import lombok.Data;
@Data
public class TicketDTO {
	private Integer ticketId;

	private String ticketName;

	private String ticketDescription;

	private String ticketAssignTo;

	private  LocalDate ticketCreatedDate;

	private  LocalDate ticketUpdatedDate;

	private Integer ticketEstimatedTime;

	private Boolean showTicket=true;

	private Integer status;
}
