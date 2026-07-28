package com.FlumpLandPlayZoneApplication.attendance.dto;

import com.FlumpLandPlayZoneApplication.billing.dto.InventoriesDto;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Data
public class CheckedIn {

    @NotNull(message = "User ID cannot be null")
    private String userId;
    private List<String> activities;
    private List<InventoriesDto> inventories;
}