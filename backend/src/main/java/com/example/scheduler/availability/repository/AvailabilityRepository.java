package com.example.scheduler.availability.repository;

import com.example.scheduler.availability.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findByEmployeeId(Long employeeId);
    List<Availability> findByEmployeeIdAndDayOfWeek(Long employeeId, String dayOfWeek);
    void deleteByEmployeeId(Long employeeId);
}