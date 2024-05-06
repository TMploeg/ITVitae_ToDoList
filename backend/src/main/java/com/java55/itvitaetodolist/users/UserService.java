package com.java55.itvitaetodolist.users;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final int PASSWORD_MIN_LENGTH = 7;
    private static final String PASSWORD_SPECIAL_CHARACTER_PATTERN = "[!@#$%&*()_+=|<>?{}\\[\\]~-]";
    private static final String DEFAULT_ROLE = "ROLE_user";

    public User save(String username, String password) {
        return userRepository.save(new User(username, passwordEncoder.encode(password), DEFAULT_ROLE));
    }

    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                    "user '" + username + "' not found"
                ));
    }

    public boolean userExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public boolean isValidPassword(String password) {
        return password != null
                && password.length() >= PASSWORD_MIN_LENGTH
                && Pattern.compile("[0-9]").matcher(password).find()
                && Pattern.compile("[a-z]").matcher(password).find()
                && Pattern.compile("[A-Z]").matcher(password).find()
                && Pattern.compile(PASSWORD_SPECIAL_CHARACTER_PATTERN).matcher(password).find();
    }

    public boolean isCorrectUserPassword(String username, String password)
            throws UsernameNotFoundException {
        return passwordEncoder.matches(password, loadUserByUsername(username).getPassword());
    }
}
