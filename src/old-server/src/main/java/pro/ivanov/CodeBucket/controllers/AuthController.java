package pro.ivanov.CodeBucket.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import pro.ivanov.CodeBucket.repositories.RoleRepository;
import pro.ivanov.CodeBucket.repositories.UserRepository;

@RestController
public class AuthController {
	  @Autowired
	  private AuthenticationManager authenticationManager;
	  
	  @Autowired
	  private UserRepository userRepository;

	  @Autowired
	  private RoleRepository roleRepository;

	  @Autowired
	  private PasswordEncoder passwordEncoder;
}