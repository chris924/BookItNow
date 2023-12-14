package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.Role;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@TestPropertySource(locations = {"classpath:application-test.properties"}, properties = {"spring.config.name=application-test"})
public class RoleRepositoryTests {

    @Autowired
    private IRoleRepository roleRepository;

    private final Role testRole = new Role(0, "test");

    @Test
    public void RoleRepository_FindByAuthority_ReturnRole()
    {
        roleRepository.save(testRole);
       Optional<Role> foundRole =  roleRepository.findByAuthority("test");

        Assertions.assertNotNull(foundRole);
        Assertions.assertEquals(foundRole.get().getAuthority(), "test");
    }


    @Test
    public void RoleRepository_FindByAuthority_ReturnOptionalEmptyIfNotFound()
    {
        Optional<Role> notFoundRole =  roleRepository.findByAuthority("test");

        Assertions.assertEquals(notFoundRole, Optional.empty());
    }

    @Test
    public void RoleRepository_GetRoleById_ReturnRole()
    {
        roleRepository.save(testRole);

       Optional<Role> foundRole =  roleRepository.findById(testRole.getId());

       Assertions.assertNotNull(foundRole);
       Assertions.assertEquals(foundRole.get().getAuthority(), "test");

    }

}
