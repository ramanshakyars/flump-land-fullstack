package com.FlumpLandPlayZoneApplication.billing.dto;

import lombok.Data;

@Data
public class InventoryBillingDto {
    private String inventoryId;
    private String inventoryType;
    private String name;
    private String quantity;
    private String totalAmount;
}
