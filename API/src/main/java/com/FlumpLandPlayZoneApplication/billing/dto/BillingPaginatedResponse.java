package com.FlumpLandPlayZoneApplication.billing.dto;

import com.FlumpLandPlayZoneApplication.billing.entity.Billing;
import lombok.Data;

import java.util.List;

@Data
public class BillingPaginatedResponse {
    private int totalRecords;
    private int page;
    private List<Billing> billingList;
}
