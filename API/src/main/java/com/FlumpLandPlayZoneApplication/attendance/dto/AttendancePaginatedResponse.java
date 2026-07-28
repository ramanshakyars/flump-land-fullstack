package com.FlumpLandPlayZoneApplication.attendance.dto;

import com.FlumpLandPlayZoneApplication.attendance.entity.Attendance;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AttendancePaginatedResponse {
    private String totalRecords;
    private String page;
    private List<Attendance> attendanceList;
}
