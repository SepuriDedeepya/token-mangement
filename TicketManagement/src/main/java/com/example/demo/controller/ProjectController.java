package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.IProjectService;

@RestController
@RequestMapping("organisation/login")
public class ProjectController {
	
	@Autowired
	IProjectService service;

	
	

}
