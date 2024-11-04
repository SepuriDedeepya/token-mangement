package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Organisation;

@EnableJpaRepositories
public interface IOrganisationRepository extends JpaRepository<Organisation,Integer> {
	@Query(value="select * from organisation o where o.project_manager_name=:projectManagerName",nativeQuery=true)
	public Organisation findByProjectManagerName(@Param("projectManagerName") String projectManagerName );
	
}
