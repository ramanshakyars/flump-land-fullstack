package com.FlumpLandPlayZoneApplication.attendance.dto;

import lombok.Data;

@Data
public class PurchasedItems {
    private String inventoryId;
    private int quantity;

    public PurchasedItems(String inventoryId, int quantity) {
        this.inventoryId = inventoryId;
        this.quantity = quantity;
    }
}
