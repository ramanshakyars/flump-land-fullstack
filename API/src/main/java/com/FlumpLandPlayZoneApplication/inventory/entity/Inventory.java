package com.FlumpLandPlayZoneApplication.inventory.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Data
@Document(collection = "inventory")
public class Inventory {
    @Id
    private String id;
    private String name;
    private BigDecimal price;
    private int totalQuantity;
    private String inventoryType;
}
