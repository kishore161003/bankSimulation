package com.example.BankingApplication.Repository;

import com.example.BankingApplication.Entity.User;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByAccNo(long accNo);

    List<User> findByPhno(long phno);

}
