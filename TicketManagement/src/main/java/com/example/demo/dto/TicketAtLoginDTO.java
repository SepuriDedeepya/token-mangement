package com.example.demo.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketAtLoginDTO 
{
	private Integer ticketId;
	private String ticketName;
	private Integer status;
	private LocalDate ticketUpdatedDate;
}
