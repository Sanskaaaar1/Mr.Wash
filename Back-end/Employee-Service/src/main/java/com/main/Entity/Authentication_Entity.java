package com.main.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
@Entity
public class Authentication_Entity {

	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer authId;
	    
	    @OneToOne
	    @JoinColumn(name = "info_id", nullable = true, unique = true)
	    @JsonIgnore
	    private Info_Entity user;
	    
		@Column(unique = true, nullable = false)
	    private String username;
	    
	    @Column(nullable = false)
	    private String password;
	    
	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private Role role;
	    
	    // Getters and Setters
	    public enum Role {
	        ADMIN, USER ,EMP
	    }

		public Integer getAuthId() {
			return authId;
		}

		public void setAuthId(Integer authId) {
			this.authId = authId;
		}

		public Info_Entity getUser() {
			return user;
		}

		public void setUser(Info_Entity user) {
			this.user = user;
		}

		public String getUsername() {
			return username;
		}
		

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Role getRole() {
			return role;
		}

		public void setRole(Role role) {
			this.role = role;
		}
	    

}
