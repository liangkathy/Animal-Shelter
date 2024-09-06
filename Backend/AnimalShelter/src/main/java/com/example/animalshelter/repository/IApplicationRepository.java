package com.example.animalshelter.repository;

import com.example.animalshelter.model.Application;
import com.example.animalshelter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IApplicationRepository extends JpaRepository<Application, Integer> {
    List<Application> getApplicationsByUser(User user);

    //JPQL
    @Query("SELECT a FROM Application a WHERE " +
            "lower(a.response1) LIKE lower(CONCAT('%',:keyword,'%')) OR " +
            "lower(a.response2) LIKE lower(CONCAT('%',:keyword,'%')) OR " +
            "lower(a.response3) LIKE lower(CONCAT('%',:keyword,'%'))")
    List<Application> findApplicationsByKeyword(@Param("keyword") String keyword);

    List<Application> getApplicationsByStatus(String status);

}
