package com.FlumpLandPlayZoneApplication.billing.service;

import com.FlumpLandPlayZoneApplication.billing.dto.BillingPaginatedResponse;
import com.FlumpLandPlayZoneApplication.billing.dto.BillingRequestDTO;
import com.FlumpLandPlayZoneApplication.billing.entity.Billing;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedRequest;

import java.util.List;

public interface BillingService {
    Billing createBill(BillingRequestDTO billing);
    BillingPaginatedResponse getAllBilling(PaginatedRequest payload);
    Billing billingDetails(String id);
    List<Billing> getUserBillings(String userId);
}
