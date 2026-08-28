package com.example.scheduler.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.scheduler.model.Employee;
import com.example.scheduler.repository.EmployeeRepository;
import java.util.List;

@Service
public class EmployeeService {

  private final EmployeeRepository repo;

  public EmployeeService(EmployeeRepository repo) {
    this.repo = repo;
  }

  @Transactional(readOnly = true)
  public List<Employee> findAll() {
    return repo.findAll();
  }

  @Transactional
  public Employee create(Employee e) {
    if (repo.existsByEmail(e.getEmail()))
      throw new IllegalArgumentException("Email taken");
    return repo.save(e);
  }

  @Transactional
  public Employee update(Long id, Employee e) {
    Employee current = repo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("No employee with id " + id));
    current.setFirstName(e.getFirstName());
    current.setLastName(e.getLastName());
    current.setEmail(e.getEmail());
    current.setDepartment(e.getDepartment());
    current.setWeeklyHours(e.getWeeklyHours());
    current.setActive(e.getActive());
    return repo.save(current);
  }

  @Transactional
  public void delete(Long id) {
    repo.deleteById(id);
  }
}
