package com.example.scheduler.demand.controller;

import com.example.scheduler.demand.model.Demand;
import com.example.scheduler.demand.service.DemandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/demands")
public class DemandController {

  private final DemandService svc;

  public DemandController(DemandService svc) {
    this.svc = svc;
  }

  @GetMapping
  public List<Demand> getAll() {
    return svc.getAll();
  }

  @GetMapping("/day/{dayOfWeek}")
  public List<Demand> getByDay(@PathVariable String dayOfWeek) {
    return svc.getByDay(dayOfWeek);
  }

  @PostMapping
  public ResponseEntity<Demand> create(@RequestBody Demand dto) {
    return ResponseEntity.ok(svc.save(dto));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Demand> update(@PathVariable Long id, @RequestBody Demand dto) {
    return ResponseEntity.ok(svc.getById(id)); // simplified for now
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    svc.delete(id);
  }
}