package com.FlumpLandPlayZoneApplication.attendance.service;

import com.FlumpLandPlayZoneApplication.attendance.dto.AttendancePaginatedResponse;
import com.FlumpLandPlayZoneApplication.attendance.dto.CheckedIn;
import com.FlumpLandPlayZoneApplication.attendance.dto.InventoryResponse;
import com.FlumpLandPlayZoneApplication.attendance.entity.Attendance;
import com.FlumpLandPlayZoneApplication.attendance.dto.*;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedRequest;

public interface AttendanceService {
    void markAttendanceCheckIn(CheckedIn attendance);

    void markAttendanceCheckOut(String id);

    AttendancePaginatedResponse getUserAttendance(String userId,PaginatedRequest payload);

    InventoryResponse getInventoryDetails(String attendanceId);

    Attendance updateAttendanceCheckIn(String attendanceId, CheckedIn requestDto);

    AttendanceDetailsDTO getAttendanceById(String id);
}
