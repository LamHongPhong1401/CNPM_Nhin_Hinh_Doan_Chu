package com.example.cmpm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.cmpm.model.Message;

@Repository
public interface MessagingRepository extends JpaRepository<Message, Integer> {

	List<Message> findTop100ByOrderByCreateAtDesc();
}
