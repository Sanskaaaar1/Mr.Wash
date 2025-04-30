package com.main.Model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.main.Entity.Authentication_Entity;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

	private Authentication_Entity user;

    public UserPrincipal(Authentication_Entity user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Use the actual role from the user entity with ROLE_ prefix
        return Collections.singleton(
            new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );
    }
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
