package com.example.scheduler.availability.service;

import com.example.scheduler.availability.model.Availability;
import com.example.scheduler.availability.repository.AvailabilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

  private final AvailabilityRepository repo;

  @Transactional(readOnly = true)
  public List<Availability> getAll() {
    return repo.findAll();
  }

  @Transactional(readOnly = true)
  public List<Availability> getByEmployeeId(Long employeeId) {
    return repo.findByEmployeeId(employeeId);
  }

  @Transactional(readOnly = true)
  public Availability getById(Long id) {
    return repo.findById(id).orElseThrow();
  }

  @Transactional
  public Availability save(Availability a) {
    return repo.save(a);
  }

  @Transactional
  public void delete(Long id) {
    repo.deleteById(id);
  }
}