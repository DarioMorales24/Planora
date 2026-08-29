package com.example.scheduler.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.example.scheduler.service.EmployeeService;
import com.example.scheduler.controller.response.Message;
import com.example.scheduler.model.Employee;
import com.example.scheduler.dto.EmployeeDto;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

  private final EmployeeService svc;

  public EmployeeController(EmployeeService svc) {
    this.svc = svc;
  }

  @GetMapping("/ping")
  public ResponseEntity<Message> ping() {
    return ResponseEntity.ok(new Message("Pong"));
  }

  @GetMapping
  public List<Employee> getAll() {
    return svc.findAll();
  }

  @PostMapping
public ResponseEntity<Employee> create(@RequestBody EmployeeDto dto) {
  Employee e = new Employee();
  e.setName(dto.getName());
  e.setEmail(dto.getEmail());
  e.setDepto(dto.getDepto());
  e.setWeeklyHours(dto.getWeeklyHours());
  return ResponseEntity.ok(svc.create(e));
}

  @PutMapping("/{id}")
public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody EmployeeDto dto) {
  Employee e = new Employee();
  e.setName(dto.getName());
  e.setEmail(dto.getEmail());
  e.setDepto(dto.getDepto());
  e.setWeeklyHours(dto.getWeeklyHours());
  return ResponseEntity.ok(svc.update(id, e));
}

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    svc.delete(id);
  }
}
