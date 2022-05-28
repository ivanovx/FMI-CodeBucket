package pro.ivanov.CodeBucket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import pro.ivanov.CodeBucket.models.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}