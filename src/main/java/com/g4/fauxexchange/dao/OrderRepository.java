package com.g4.fauxexchange.dao;

import java.util.List;

import com.g4.fauxexchange.model.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends MongoRepository<Order, String> {

    @Query(value = "{ 'code': ?0 }")
	public List<Order> findByCode(String code);

    @Query(value = "{ 'userId': ?0 }")
    public List<Order> findByUserId(String userId);
    
}