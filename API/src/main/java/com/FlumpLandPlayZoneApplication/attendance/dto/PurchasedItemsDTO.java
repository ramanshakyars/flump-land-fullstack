package com.FlumpLandPlayZoneApplication.attendance.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PurchasedItemsDTO {
    private String inventoryId;
    private int quantity;
    private String name;
    private BigDecimal price;
    private BigDecimal totalAmount;
    private String inventoryType;
}
