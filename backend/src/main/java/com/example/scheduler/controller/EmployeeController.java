package com.example.scheduler.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.example.scheduler.service.EmployeeService;
import com.example.scheduler.model.Employee;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

  private final EmployeeService svc;

  public EmployeeController(EmployeeService svc) {
    this.svc = svc;
  }

  @GetMapping
  public List<Employee> getAll() {
    return svc.findAll();
  }

  @PostMapping
  public ResponseEntity<Employee> create(@RequestBody Employee e) {
    return ResponseEntity.ok(svc.create(e));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody Employee e) {
    return ResponseEntity.ok(svc.update(id, e));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    svc.delete(id);
  }
}
