package com.example.scheduler.scheduledShift.model;

import jakarta.persistence.*;
import lombok.*;

import com.example.scheduler.employee.model.Employee;
import com.example.scheduler.shift.model.Shift;

@Entity
@Table(name = "scheduled_shift")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduledShift {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "employee_id", nullable = false)
  private Employee employee;

  @ManyToOne(optional = false)
  @JoinColumn(name = "shift_id", nullable = false)
  private Shift shift;

  @Column(nullable = false)
  private String date; // yyyy-MM-dd

  @Column(length = 5)
  private String actualStartTime; // HH:mm, null = usa default del turno

  @Column(length = 5)
  private String actualEndTime; // HH:mm, null = usa default del turno

  @Column(nullable = false)
  private Boolean active = Boolean.TRUE;
}