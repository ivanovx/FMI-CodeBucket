package pro.ivanov.CodeBucket.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import pro.ivanov.CodeBucket.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {
	User findById(int id);
	Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}