package com.example.scheduler.scheduledShift.repository;

import com.example.scheduler.scheduledShift.model.ScheduledShift;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScheduledShiftRepository extends JpaRepository<ScheduledShift, Long> {
    List<ScheduledShift> findByDateBetween(String startDate, String endDate);
    void deleteByDateBetween(String startDate, String endDate);
    void deleteByEmployeeId(Long employeeId);
    void deleteByShiftId(Long shiftId);
}