package com.main.Model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.main.Entity.Authentication_Entity;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

    private Authentication_Entity user; // The user entity containing authentication details

    // Constructor to initialize the UserPrincipal with an Authentication_Entity object
    public UserPrincipal(Authentication_Entity user) {
        this.user = user;
    }

    // Override to return the user's authorities (roles), with "ROLE_" prefix
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton( // Only a single role here, return it as a singleton
            new SimpleGrantedAuthority("ROLE_" + user.getRole().name()) // Role with "ROLE_" prefix
        );
    }

    // Override to return the user's password
    @Override
    public String getPassword() {
        return user.getPassword(); // Return password from the entity
    }

    // Override to return the username
    @Override
    public String getUsername() {
        return user.getUsername(); // Return username from the entity
    }

    // Override to indicate the account is not expired
    @Override
    public boolean isAccountNonExpired() {
        return true; // Account is always valid (no expiration check in this example)
    }

    // Override to indicate the account is not locked
    @Override
    public boolean isAccountNonLocked() {
        return true; // Account is always unlocked (no lock check in this example)
    }

    // Override to indicate the credentials are not expired
    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Credentials are always valid (no expiration check here)
    }

    // Override to indicate the user is enabled
    @Override
    public boolean isEnabled() {
        return true; // User is always enabled (no deactivation check here)
    }
}
