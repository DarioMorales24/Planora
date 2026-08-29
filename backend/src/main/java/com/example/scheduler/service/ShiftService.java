package com.example.scheduler.service;

import com.example.scheduler.model.Shift;
import com.example.scheduler.repository.ShiftRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ShiftService {
  private final ShiftRepository repo;
  public ShiftService(ShiftRepository repo) { this.repo = repo; }

  public List<Shift> findAll() { return repo.findAll(); }

  @Transactional
  public Shift create(Shift shift) { return repo.save(shift); }

  @Transactional
  public Shift update(Long id, Shift shift) {
    return repo.findById(id).map(existing -> {
      existing.setStartTime(shift.getStartTime());
      existing.setEndTime(shift.getEndTime());
      existing.setRequiredStaff(shift.getRequiredStaff());
      existing.setRequiredSkills(shift.getRequiredSkills());
      return repo.save(existing);
    }).orElseThrow(() -> new IllegalArgumentException("No shift with id " + id));
  }

  @Transactional
  public void delete(Long id) { repo.deleteById(id); }
}
