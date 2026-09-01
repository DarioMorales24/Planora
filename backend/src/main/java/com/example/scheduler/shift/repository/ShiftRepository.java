package com.example.scheduler.shift.repository;

import com.example.scheduler.shift.model.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    // Métodos personalizados pueden agregarse aquí
}