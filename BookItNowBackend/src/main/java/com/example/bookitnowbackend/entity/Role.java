package com.example.bookitnowbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

@Data
@Entity
@Table(name = "roles")
@AllArgsConstructor
@NoArgsConstructor
public class Role  implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="role_id")
    private Integer id;

    private String authority;

   // public Role(){super();}

    public Role(String authority)
    {
        this.authority = authority;
    }


   /* public Role(Integer roleId, String authority)
    {
        this.roleId = roleId;
        this.authority = authority;
    }*/

    @Override
    public String getAuthority() {
        return this.authority;
    }

    public void setAuthority(String authority)
    {
        this.authority = authority;
    }

  /*  public Integer getRoleId()
    {
        return this.roleId;
    }/*

   /* public void setRoleId(Integer roleId)
    {
        this.roleId = roleId;
    }*/
}
