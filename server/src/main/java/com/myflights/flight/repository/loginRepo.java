package com.myflights.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myflights.flight.entity.Login;

public interface loginRepo  extends JpaRepository<Login,Integer> {
	
	Login findByName(String name);

}
