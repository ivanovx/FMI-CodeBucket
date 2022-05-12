package pro.ivanov.CodeBucket.models;

import java.util.Set;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Table(name="users", uniqueConstraints = {
		@UniqueConstraint(columnNames = "email"),
		@UniqueConstraint(columnNames = "username"),
})
public class User {
	  @Id
	  @GeneratedValue(strategy=GenerationType.IDENTITY)
	  private int id;

	  private String name;

	  private String email;
	  
	  private String username;
	  
	  private String password;
	  
	  @OneToMany
	  private Set<Role> roles;

	  public int getId() {
	    return id;
	  }

	  public void setId(int id) {
	    this.id = id;
	  }

	  public String getName() {
	    return name;
	  }

	  public void setName(String name) {
	    this.name = name;
	  }

	  public String getEmail() {
	    return email;
	  }

	  public void setEmail(String email) {
	    this.email = email;
	  }
	  
	  public String getPassword() {
		    return password;
	  }

	  public void setPassword(String password) {
		  this.password = password;
	  }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
