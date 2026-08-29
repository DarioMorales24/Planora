package com.example.scheduler.service;

import jakarta.validation.constraints.NotNull;
import java.time.LocalTime;
import java.util.List;

public class ShiftDto {
  @NotNull private LocalTime startTime;
  @NotNull private LocalTime endTime;
  private Integer requiredStaff;
  private List<Long> requiredSkillIds;

  // getters and setters
  public LocalTime getStartTime() { return startTime; }
  public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
  public LocalTime getEndTime() { return endTime; }
  public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
  public Integer getRequiredStaff() { return requiredStaff; }
  public void setRequiredStaff(Integer requiredStaff) { this.requiredStaff = requiredStaff; }
  public List<Long> getRequiredSkillIds() { return requiredSkillIds; }
  public void setRequiredSkillIds(List<Long> requiredSkillIds) { this.requiredSkillIds = requiredSkillIds; }
}
