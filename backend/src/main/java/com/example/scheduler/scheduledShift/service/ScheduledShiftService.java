package com.example.scheduler.scheduledShift.service;

import com.example.scheduler.scheduledShift.model.ScheduledShift;
import com.example.scheduler.scheduledShift.repository.ScheduledShiftRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduledShiftService {

  private final ScheduledShiftRepository repo;

  @Transactional(readOnly = true)
  public List<ScheduledShift> getAll() {
    return repo.findAll();
  }

  @Transactional(readOnly = true)
  public ScheduledShift getById(Long id) {
    return repo.findById(id).orElseThrow();
  }

  @Transactional
  public ScheduledShift save(ScheduledShift s) {
    return repo.save(s);
  }

  @Transactional
  public void delete(Long id) {
    repo.deleteById(id);
  }

  @Transactional
  public void deleteByEmployeeId(Long employeeId) {
    repo.deleteByEmployeeId(employeeId);
  }

  @Transactional
  public void deleteByShiftId(Long shiftId) {
    repo.deleteByShiftId(shiftId);
  }
}