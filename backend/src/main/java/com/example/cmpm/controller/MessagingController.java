package com.example.cmpm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cmpm.repository.MessagingRepository;

@RestController
@RequestMapping("/message")
public class MessagingController {
	@Autowired 
	MessagingRepository messagingRepository;
	@GetMapping
	public ResponseEntity<?> get100Messages(){
		return ResponseEntity.ok(messagingRepository.findTop100ByOrderByCreateAtDesc());
	}
}
