package com.FlumpLandPlayZoneApplication.billing.dto;

import com.FlumpLandPlayZoneApplication.activity.entity.Activity;
import com.FlumpLandPlayZoneApplication.billing.entity.PaymentMode;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class BillingRequestDTO {
    private String userId;
    private List<Activity> activities;
    private List<InventoryBillingDto>inventories;
    @NotNull(message = "Total amount cannot be null")
    private BigDecimal totalAmount;
    @NotNull(message = "Payment mode cannot be Empty")
    private PaymentMode paymentMode;
}
