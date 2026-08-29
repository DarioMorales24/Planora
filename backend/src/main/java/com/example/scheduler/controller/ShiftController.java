package com.example.scheduler.controller;

import com.example.scheduler.service.ShiftService;
import com.example.scheduler.service.ShiftDto;
import com.example.scheduler.model.Shift;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shifts")
public class ShiftController {
  private final ShiftService svc;
  public ShiftController(ShiftService svc) { this.svc = svc; }

  @GetMapping
  public List<Shift> getAll() { return svc.findAll(); }

  @PostMapping
  public ResponseEntity<Shift> create(@RequestBody ShiftDto dto) {
    Shift shift = new Shift();
    shift.setStartTime(dto.getStartTime());
    shift.setEndTime(dto.getEndTime());
    shift.setRequiredStaff(dto.getRequiredStaff());
    // convert skill ids → entities omitted for brevity
    return ResponseEntity.ok(svc.create(shift));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Shift> update(@PathVariable Long id, @RequestBody ShiftDto dto) {
    Shift shift = new Shift();
    shift.setStartTime(dto.getStartTime());
    shift.setEndTime(dto.getEndTime());
    shift.setRequiredStaff(dto.getRequiredStaff());
    return ResponseEntity.ok(svc.update(id, shift));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) { svc.delete(id); }
}
