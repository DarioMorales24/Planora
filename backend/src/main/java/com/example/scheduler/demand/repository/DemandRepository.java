package com.example.scheduler.demand.repository;

import com.example.scheduler.demand.model.Demand;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandRepository extends JpaRepository<Demand, Long> {
    List<Demand> findByDayOfWeek(String dayOfWeek);
}