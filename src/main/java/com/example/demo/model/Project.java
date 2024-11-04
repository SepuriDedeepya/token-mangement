package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@NoArgsConstructor
@Data
public class Project 
{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer projectId;
	@NonNull
	private String projectName;
	@NonNull
	private String projectDescription;
	@NonNull
	@CreationTimestamp
	private LocalDate creationDate;
	@NonNull
	private Boolean isProjectAvailable=true;
	
	@NonNull
	private Integer assignCount=0;
	
	@NonNull
	private Integer action;
	
	@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	private List<Employee> employees;

	@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	private List<Ticket> tickets;

   }

