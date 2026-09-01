package com.example.scheduler.availability.model;

import com.example.scheduler.employee.model.Employee;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "availability")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Availability {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "employee_id", nullable = false)
  private Employee employee;

  @Column(nullable = false)
  private String dayOfWeek; // MONDAY, TUESDAY, etc.

  @Column(nullable = false)
  private Boolean available;

  @Column(length = 5)
  private String startTime; // HH:mm format, null = todo el día

  @Column(length = 5)
  private String endTime; // HH:mm format, null = todo el día

  @Column(length = 100)
  private String notes;
}