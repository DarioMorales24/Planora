package com.example.scheduler.demand.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "demand")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Demand {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String dayOfWeek; // MONDAY, TUESDAY, etc.

  @Column(nullable = false)
  private String startTime; // HH:mm format

  @Column(nullable = false)
  private String endTime; // HH:mm format

  @Column(nullable = false)
  private Integer minStaff; // minimum number of workers required

  @Column(length = 100)
  private String notes;
}