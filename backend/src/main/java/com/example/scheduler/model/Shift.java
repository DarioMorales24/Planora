package com.example.scheduler.model;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
public class Shift {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private LocalTime startTime;
  private LocalTime endTime;
  private Integer requiredStaff;
  @ManyToMany
  private List<Skill> requiredSkills;

  // getters and setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public LocalTime getStartTime() { return startTime; }
  public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
  public LocalTime getEndTime() { return endTime; }
  public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
  public Integer getRequiredStaff() { return requiredStaff; }
  public void setRequiredStaff(Integer requiredStaff) { this.requiredStaff = requiredStaff; }
  public List<Skill> getRequiredSkills() { return requiredSkills; }
  public void setRequiredSkills(List<Skill> requiredSkills) { this.requiredSkills = requiredSkills; }
}
