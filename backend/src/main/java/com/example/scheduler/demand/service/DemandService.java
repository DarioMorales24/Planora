package com.example.scheduler.demand.service;

import com.example.scheduler.demand.model.Demand;
import com.example.scheduler.demand.repository.DemandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DemandService {

  private final DemandRepository repo;

  public List<Demand> getAll() {
    return repo.findAll();
  }

  public List<Demand> getByDay(String dayOfWeek) {
    return repo.findByDayOfWeek(dayOfWeek);
  }

  public Demand getById(Long id) {
    return repo.findById(id).orElseThrow();
  }

  public Demand save(Demand d) {
    return repo.save(d);
  }

  @Transactional
  public void delete(Long id) {
    repo.deleteById(id);
  }
}