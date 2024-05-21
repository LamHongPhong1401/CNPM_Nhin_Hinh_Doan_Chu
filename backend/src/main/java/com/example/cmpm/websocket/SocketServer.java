package com.example.cmpm.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.cmpm.model.Message;
import com.example.cmpm.repository.MessagingRepository;
import com.google.gson.Gson;

@Controller
@CrossOrigin(origins = "*")
public class SocketServer {
	
	@Autowired
	MessagingRepository messagingRepository;
	@MessageMapping("/send-message")
	@SendTo("/topic/messages")
	public String sendMessage(String message) {
		System.out.println(message);
		Gson gson = new Gson();
		Message m = gson.fromJson(message, Message.class);
//		4.10.12 Save Message
		messagingRepository.save(m); 
//		4.10.14 socket.emit
		return  message; 
	}
}