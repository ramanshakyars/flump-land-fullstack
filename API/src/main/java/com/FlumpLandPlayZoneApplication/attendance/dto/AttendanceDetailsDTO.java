package com.FlumpLandPlayZoneApplication.attendance.dto;

import com.FlumpLandPlayZoneApplication.activity.entity.Activity;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
public class AttendanceDetailsDTO {
    private String id;
    private String userId;
    private Date date;
    private LocalDateTime checkIn;
    private LocalDateTime checkout;
    private List<Activity> activities;
    private List<PurchasedItemsDTO> inventories;
}
