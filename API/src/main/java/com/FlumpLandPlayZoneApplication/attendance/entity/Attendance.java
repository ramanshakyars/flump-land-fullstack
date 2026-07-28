package com.FlumpLandPlayZoneApplication.attendance.entity;

import com.FlumpLandPlayZoneApplication.activity.entity.Activity;
import com.FlumpLandPlayZoneApplication.attendance.dto.PurchasedItems;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "attendance")
public class Attendance {
    @Id
    private String id;
    private String userId;
    private Date date;
    private LocalDateTime checkIn;
    private LocalDateTime checkout;
    private List<Activity> activities;
    private List<PurchasedItems> inventories;
}
