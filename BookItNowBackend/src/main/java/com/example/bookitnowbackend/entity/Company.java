package com.example.bookitnowbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "COMPANY_TBL")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String companyName;

    private String password;

    private String email;

    private String description;

    private Timestamp createdAt;

    @OneToMany(mappedBy= "company")
    private List<AppService> services;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "company_role_junction",
            joinColumns = @JoinColumn(name = "company_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> authorities;
}
