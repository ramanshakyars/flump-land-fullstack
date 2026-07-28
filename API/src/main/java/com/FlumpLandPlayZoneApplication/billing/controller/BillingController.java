package com.FlumpLandPlayZoneApplication.billing.controller;

import com.FlumpLandPlayZoneApplication.billing.dto.BillingPaginatedResponse;
import com.FlumpLandPlayZoneApplication.billing.dto.BillingRequestDTO;
import com.FlumpLandPlayZoneApplication.billing.entity.Billing;
import com.FlumpLandPlayZoneApplication.billing.service.BillingService;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "billing")
@RestController
@AllArgsConstructor
public class BillingController {
    private final BillingService billingService;

    @PostMapping()
    public ResponseEntity<Billing> createBilling(@Valid @RequestBody BillingRequestDTO billing) {
        return ResponseEntity.ok(billingService.createBill(billing));
    }

    @PostMapping("paginated")
    public ResponseEntity<BillingPaginatedResponse> getAllBillings(@RequestBody PaginatedRequest payload) {
        return ResponseEntity.ok(billingService.getAllBilling(payload));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillingDetails(@PathVariable("id") String id) {
        return ResponseEntity.ok(billingService.billingDetails(id));
    }

    @GetMapping("bills/{userId}")
    public ResponseEntity<List<Billing>> getUserBillings(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(billingService.getUserBillings(userId));
    }


}
