package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found.");
        }

        return user;
    }

    public User loadUserById(Long id) {
       Optional<User> user = userRepository.findById(id);

       if (user.isEmpty()) {
           throw new UsernameNotFoundException("User not found.");
       }

       return user.get();
    }
}