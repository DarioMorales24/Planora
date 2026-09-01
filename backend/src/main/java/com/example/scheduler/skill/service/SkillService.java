package com.example.scheduler.skill.service;

import com.example.scheduler.skill.model.Skill;
import com.example.scheduler.skill.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

  private final SkillRepository repo;

  public List<Skill> getAll() {
    return repo.findAll();
  }

  public Skill getById(Long id) {
    return repo.findById(id).orElseThrow();
  }

  public Skill getByName(String name) {
    return repo.findByName(name);
  }

  public Skill save(Skill skill) {
    return repo.save(skill);
  }

  @Transactional
  public void delete(Long id) {
    Skill skill = getById(id);
    repo.delete(skill);
  }
}