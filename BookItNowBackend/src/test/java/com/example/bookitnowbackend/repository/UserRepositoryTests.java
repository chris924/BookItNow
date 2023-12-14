package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.Role;
import com.example.bookitnowbackend.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat; // Import assertThat from AssertJ

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@TestPropertySource(locations = {"classpath:application-test.properties"}, properties = {"spring.config.name=application-test"})
public class UserRepositoryTests {

    @Autowired
    private IUserRepository userRepository;

    @Test
    public void UserRepository_Save_ReturnSavedUser()
    {
        //Arrange
        User testUser = User.builder().build();
        Set<Role> authorities = new HashSet<>();
        testUser.setName("TEST");
        testUser.setUsername("TEST");
        testUser.setPassword("TEST");
        testUser.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        testUser.setAuthorities(authorities);
        //Act
      User savedUser =  userRepository.save(testUser);
        //Assert
        Assertions.assertNotNull(savedUser);
        Assertions.assertEquals(savedUser.getUsername(), "TEST");
    }

    @Test
    public void UserRepository_GetUserByUsername_ReturnUser()
    {
        //Arrange
        User testUser = User.builder().build();
        testUser.setUsername("TEST");
        userRepository.save(testUser);

        //Act
        Optional<User> foundUser = userRepository.getUserByUsername("TEST");

        //Assert
        Assertions.assertNotNull(foundUser);
        Assertions.assertEquals(foundUser.get().getUsername(), "TEST");
    }

    @Test
    public void UserRepository_GetUserById_ReturnUser()
    {
        //Arrange
        User testUser = User.builder().build();
        testUser.setUsername("TEST");

        userRepository.save(testUser);
        //Act
        Optional<User> foundUser = userRepository.findById(1);

        //Assert
        Assertions.assertNotNull(foundUser);
        Assertions.assertEquals(foundUser.get().getUserId(), 1);
    }

    @Test
    public void UserRepository_GetUserById_ReturnOptionalEmptyIfNotFound()
    {
        Optional<User> notFoundUser = userRepository.findById(4);

        //Assert
        Assertions.assertEquals(notFoundUser, Optional.empty());


    }



}
