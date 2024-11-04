package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
@Entity
@NoArgsConstructor
@Data
public class Organisation {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer organisationId;
	@NonNull
	private String projectManagerName;
	@NonNull
	private String projectManagerPassword;
}
