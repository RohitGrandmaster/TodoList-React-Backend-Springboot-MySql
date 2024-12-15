package com.example.TodoTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.TodoTask.model.TodoModel;
 

@Repository
public interface TodoRepository extends JpaRepository<TodoModel, Long> {
    
	
}
