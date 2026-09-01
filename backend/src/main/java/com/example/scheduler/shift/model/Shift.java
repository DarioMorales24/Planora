package com.example.scheduler.shift.model;

import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.List;

import com.example.scheduler.employee.model.Employee;
import com.example.scheduler.skill.model.Skill;

import lombok.*;

@Entity
@Table(name = "shift")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Shift {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 5)
  private LocalTime startTime;

  @Column(nullable = false, length = 5)
  private LocalTime endTime;

  @Column
  private Integer requiredStaff;

  @ManyToMany
  @JoinTable(
      name = "shift_required_skills",
      joinColumns = @JoinColumn(name = "shift_id"),
      inverseJoinColumns = @JoinColumn(name = "skill_id"))
  private List<Skill> requiredSkills;

  @ManyToMany
  @JoinTable(
      name = "shift_employee",
      joinColumns = @JoinColumn(name = "shift_id"),
      inverseJoinColumns = @JoinColumn(name = "employee_id"))
  private List<Employee> assignedEmployees;
}