package com.FlumpLandPlayZoneApplication.user.dto;

import lombok.Data;

import java.util.Date;

@Data
public class AttendanceDto {
    private Date date;
    private String attendanceId;
    private boolean isCheckOut = false;
}
