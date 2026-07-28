package com.FlumpLandPlayZoneApplication.attendance.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
public class InventoryResponse {
    private Date date;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private List<ActivityDto> activityList;
    private List<InventoryDto> inventoryList;
}
