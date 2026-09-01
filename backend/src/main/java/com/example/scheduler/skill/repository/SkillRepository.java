package com.example.scheduler.skill.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.scheduler.skill.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    Skill findByName(String name);
}