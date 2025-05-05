package com.main.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.main.Entity.Authentication_Entity;
import com.main.Entity.Info_Entity;
import com.main.Exception.*;
import com.main.Repository.AuthRepo;
import com.main.Repository.InfoRepo;
import com.main.RestController.AuthController;
import com.main.Service.AuthService;
import com.main.Validation.RegisterValidation;

public class AuthControllerJUnitTest {

    private AuthController authController;
    private TestAuthService authService;
    private TestInfoRepo infoRepo;
    private TestAuthRepo authRepo;
    private BCryptPasswordEncoder passwordEncoder;

    // Test implementations of dependencies
    class TestAuthService extends AuthService {
        public String verifyResult = "test-token";
        
        @Override
        public String verify(Authentication_Entity user) {
            return verifyResult;
        }
    }

    class TestInfoRepo implements InfoRepo {
        public Info_Entity savedInfo;
        
        @Override
        public Info_Entity save(Info_Entity entity) {
            savedInfo = entity;
            return entity;
        }

		@Override
		public void flush() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public <S extends Info_Entity> S saveAndFlush(S entity) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Info_Entity> List<S> saveAllAndFlush(Iterable<S> entities) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public void deleteAllInBatch(Iterable<Info_Entity> entities) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void deleteAllByIdInBatch(Iterable<Integer> ids) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void deleteAllInBatch() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public Info_Entity getOne(Integer id) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Info_Entity getById(Integer id) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Info_Entity getReferenceById(Integer id) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Info_Entity> List<S> findAll(Example<S> example) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Info_Entity> List<S> findAll(Example<S> example, Sort sort) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Info_Entity> List<S> saveAll(Iterable<S> entities) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public List<Info_Entity> findAll() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public List<Info_Entity> findAllById(Iterable<Integer> ids) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Optional<Info_Entity> findById(Integer id) {
			// TODO Auto-generated method stub
			return Optional.empty();
		}

		@Override
		public boolean existsById(Integer id) {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public long count() {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public void deleteById(Integer id) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void delete(Info_Entity entity) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void deleteAllById(Iterable<? extends Integer> ids) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void deleteAll(Iterable<? extends Info_Entity> entities) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void deleteAll() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public List<Info_Entity> findAll(Sort sort) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Page<Info_Entity> findAll(Pageable pageable) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Info_Entity> Optional<S> findOne(Example<S> example) {
			// TODO Auto-generated method stub
			return Optional.empty();
		}

		@Override
		public <S extends Info_Entity> Page<S> findAll(Example<S> example, Pageable pageable) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Info_Entity> long count(Example<S> example) {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public <S extends Info_Entity> boolean exists(Example<S> example) {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public <S extends Info_Entity, R> R findBy(Example<S> example,
				Function<FetchableFluentQuery<S>, R> queryFunction) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Info_Entity findByFirstNameIgnoreCase(String Name) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Info_Entity findByAuthenticationUsername(String username) {
			// TODO Auto-generated method stub
			return null;
		}
    }

    class TestAuthRepo implements AuthRepo {
        public Authentication_Entity savedAuth;
        
        @Override
        public Authentication_Entity save(Authentication_Entity entity) {
            savedAuth = entity;
            return entity;
        }

		@Override
		public void flush() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public <S extends Authentication_Entity> S saveAndFlush(S entity) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Authentication_Entity> List<S> saveAllAndFlush(Iterable<S> entities) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public void deleteAllInBatch(Iterable<Authentication_Entity> entities) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void deleteAllByIdInBatch(Iterable<Integer> ids) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void deleteAllInBatch() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public Authentication_Entity getOne(Integer id) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Authentication_Entity getById(Integer id) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Authentication_Entity getReferenceById(Integer id) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Authentication_Entity> List<S> findAll(Example<S> example) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Authentication_Entity> List<S> findAll(Example<S> example, Sort sort) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Authentication_Entity> List<S> saveAll(Iterable<S> entities) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public List<Authentication_Entity> findAll() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public List<Authentication_Entity> findAllById(Iterable<Integer> ids) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Optional<Authentication_Entity> findById(Integer id) {
			// TODO Auto-generated method stub
			return Optional.empty();
		}

		@Override
		public boolean existsById(Integer id) {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public long count() {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public void deleteById(Integer id) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void delete(Authentication_Entity entity) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void deleteAllById(Iterable<? extends Integer> ids) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void deleteAll(Iterable<? extends Authentication_Entity> entities) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void deleteAll() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public List<Authentication_Entity> findAll(Sort sort) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Page<Authentication_Entity> findAll(Pageable pageable) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Authentication_Entity> Optional<S> findOne(Example<S> example) {
			// TODO Auto-generated method stub
			return Optional.empty();
		}

		@Override
		public <S extends Authentication_Entity> Page<S> findAll(Example<S> example, Pageable pageable) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <S extends Authentication_Entity> long count(Example<S> example) {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public <S extends Authentication_Entity> boolean exists(Example<S> example) {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public <S extends Authentication_Entity, R> R findBy(Example<S> example,
				Function<FetchableFluentQuery<S>, R> queryFunction) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Authentication_Entity findByUsername(String username) {
			// TODO Auto-generated method stub
			return null;
		}
    }

    @BeforeEach
    void setUp() {
        authService = new TestAuthService();
        infoRepo = new TestInfoRepo();
        authRepo = new TestAuthRepo();
        passwordEncoder = new BCryptPasswordEncoder();
        
        authController = new AuthController();
        authController.service = authService;
        authController.infoRepo = infoRepo;
        authController.authRepo = (AuthRepo) authRepo;
        authController.passwordEncoder = passwordEncoder;
    }

    // Helper method to create valid registration data
    private RegisterValidation createValidRegistration() {
        RegisterValidation reg = new RegisterValidation();
        reg.setFirstName("John");
        reg.setMiddleName("Middle");
        reg.setSurName("Doe");
        reg.setPhoneNo("1234567890");
        reg.setCity("New York");
        reg.setAddress("123 Main St");
        reg.setAge(25);
        reg.setGender("male");
        reg.setUsername("johndoe");
        reg.setPassword("password123");
        reg.setMail("john@gmail.com");
        return reg;
    }

    // Test successful registration
    @Test
    void testRegister_Success() {
        RegisterValidation reg = createValidRegistration();
        
        ResponseEntity<?> response = authController.register(reg);
        
        assertEquals("Account created successfully!", response.getBody());
        assertNotNull(infoRepo.savedInfo);
        assertNotNull(authRepo.savedAuth);
        assertEquals("John", infoRepo.savedInfo.getFirstName());
        assertEquals("johndoe", authRepo.savedAuth.getUsername());
    }

    // Test validation failures
    @Test
    void testRegister_MissingFirstName() {
        RegisterValidation reg = createValidRegistration();
        reg.setFirstName(null);
        
        assertThrows(FirstNameExceprtion.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_MissingMiddleName() {
        RegisterValidation reg = createValidRegistration();
        reg.setMiddleName(null);
        
        assertThrows(MiddleNameException.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_MissingLastName() {
        RegisterValidation reg = createValidRegistration();
        reg.setSurName(null);
        
        assertThrows(LastNameException.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_InvalidPhoneNumber() {
        RegisterValidation reg = createValidRegistration();
        reg.setPhoneNo("123"); // Too short
        
        assertThrows(PhoneNoInValid.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_MissingPhoneNumber() {
        RegisterValidation reg = createValidRegistration();
        reg.setPhoneNo(null);
        
        assertThrows(PhoneNoNullException.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_MissingCity() {
        RegisterValidation reg = createValidRegistration();
        reg.setCity(null);
        
        assertThrows(CityException.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_MissingAddress() {
        RegisterValidation reg = createValidRegistration();
        reg.setAddress(null);
        
        assertThrows(AdressException.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_AgeBelow18() {
        RegisterValidation reg = createValidRegistration();
        reg.setAge(17);
        
        assertThrows(AgeLimitException.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_MissingAge() {
        RegisterValidation reg = createValidRegistration();
        reg.setAge(null);
        
        assertThrows(AgeNullException.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_InvalidGender() {
        RegisterValidation reg = createValidRegistration();
        reg.setGender("other");
        
        assertThrows(GenderException.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_MissingUsername() {
        RegisterValidation reg = createValidRegistration();
        reg.setUsername(null);
        
        assertThrows(UserNameException.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_MissingPassword() {
        RegisterValidation reg = createValidRegistration();
        reg.setPassword(null);
        
        assertThrows(NullPassword.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_MissingEmail() {
        RegisterValidation reg = createValidRegistration();
        reg.setMail(null);
        
        assertThrows(NullMailException.class, () -> authController.register(reg));
    }

    @Test
    void testRegister_InvalidEmailFormat() {
        RegisterValidation reg = createValidRegistration();
        reg.setMail("invalid-email");
        
        assertThrows(MailInvalidException.class, () -> authController.register(reg));
    }

    // Test login functionality
    @Test
    void testLogin_Success() {
        Authentication_Entity user = new Authentication_Entity();
        user.setUsername("johndoe");
        user.setPassword("password123");
        
        String result = authController.login(user);
        assertEquals("test-token", result);
    }
}