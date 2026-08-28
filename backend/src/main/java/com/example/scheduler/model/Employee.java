package com.example.scheduler.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 150)
  private String firstName;

  @Column(nullable = false, length = 150)
  private String lastName;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(length = 100)
  private String department;

  @Column
  private Integer weeklyHours; // 0‑72

  @Column
  private Boolean active = Boolean.TRUE;
}
