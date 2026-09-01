package com.example.scheduler.employee.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EmployeeDto {
  @NotBlank private String name;
  @Email @NotBlank private String email;
  private String depto;
  private Integer weeklyHours;

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getDepto() { return depto; }
  public void setDepto(String depto) { this.depto = depto; }
  public Integer getWeeklyHours() { return weeklyHours; }
  public void setWeeklyHours(Integer weeklyHours) { this.weeklyHours = weeklyHours; }
}
