package com.example.TodoTask.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TodoTask.model.TodoModel;
import com.example.TodoTask.repository.TodoRepository;


@Service
public class TodoService {

	  @Autowired
	    private TodoRepository todoRepository;

	    public List<TodoModel> getAllTodos() {
	        return todoRepository.findAll();
	    }

	    public TodoModel getTodoById(Long id) {
	        return todoRepository.findById(id).orElse(null);
	    }

	    public TodoModel createTodo(TodoModel todo) {
	        return todoRepository.save(todo);
	    }

	    public TodoModel updateTodo(Long id, TodoModel updatedTodo) {
	        return todoRepository.findById(id).map(todo -> {
	            todo.setTitle(updatedTodo.getTitle());
	            todo.setDescription(updatedTodo.getDescription());
	            todo.setCompleted(updatedTodo.isCompleted());
	            return todoRepository.save(todo);
	        }).orElse(null);
	    }

	    public void deleteTodoById(Long id) {
	        todoRepository.deleteById(id);
	    }
	
}
