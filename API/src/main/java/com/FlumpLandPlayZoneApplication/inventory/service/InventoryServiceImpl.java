package com.FlumpLandPlayZoneApplication.inventory.service;


import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.common.MessageConfig;
import com.FlumpLandPlayZoneApplication.inventory.entity.Inventory;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
@Slf4j
public class InventoryServiceImpl implements InventoryService {

    private final MongoTemplate mongoTemplate;

    private Inventory findById(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        return mongoTemplate.findOne(query, Inventory.class);
    }

    private List<Inventory> findAll() {
        return mongoTemplate.findAll(Inventory.class);
    }

    @Override
    public Inventory createInventory(Inventory inventory) {
        return mongoTemplate.save(inventory);
    }

    @Override
    public Inventory updateInventory(Inventory inventory, String id) {
        inventory.setId(id);
        mongoTemplate.save(inventory);
        return inventory;
    }

    @Override
    public APIResponseDTO deleteInventory(String id) {
        Inventory inventory = mongoTemplate.findById(id, Inventory.class);
        mongoTemplate.remove(inventory);
        return APIResponseDTO.builder().status(HttpStatus.OK).message(MessageConfig.INVENTORY_DELETE_SUCCESSFULLY)
                .build();
    }

    @Override
    public List<Inventory> getAllInventory() {
        log.info("List of all inventory");
        return findAll();
    }

    @Override
    public Inventory getInventory(String id) {
        log.info("get inventory by {}", id);
        return findById(id);
    }

    @Override
    public Inventory save(Inventory inventory) {
        return mongoTemplate.save(inventory);
    }
}
