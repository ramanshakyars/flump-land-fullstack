package com.FlumpLandPlayZoneApplication.attendance.controller;

import com.FlumpLandPlayZoneApplication.attendance.dto.*;
import com.FlumpLandPlayZoneApplication.attendance.entity.Attendance;
import com.FlumpLandPlayZoneApplication.attendance.service.AttendanceService;
import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.common.MessageConfig;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(value = "attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/check-in")
    public ResponseEntity<APIResponseDTO> checkedIn(@RequestBody CheckedIn requestDto) {
        attendanceService.markAttendanceCheckIn(requestDto);
        return ResponseEntity.ok(APIResponseDTO.builder().status(HttpStatus.OK).message(MessageConfig.TIME_RECORDED_SUCCESSFULLY).build());
    }

    @PostMapping("paginated/{userId}")
    public ResponseEntity<AttendancePaginatedResponse> getUserAttendance(@PathVariable("userId") String userId,@RequestBody PaginatedRequest payload) {
        return ResponseEntity.ok(attendanceService.getUserAttendance(userId,payload));
    }

    @PostMapping("/check-out/{attendanceId}")
    public ResponseEntity<APIResponseDTO> checkOut(@PathVariable("attendanceId") String attendanceId) {
        attendanceService.markAttendanceCheckOut(attendanceId);
        return ResponseEntity.ok(APIResponseDTO.builder().status(HttpStatus.OK).message(MessageConfig.TIME_RECORDED_SUCCESSFULLY).build());
    }

    @GetMapping("info/{attendanceId}")
    public ResponseEntity<InventoryResponse> getInventoryDetails(@PathVariable("attendanceId") String attendanceId) {
        return ResponseEntity.ok(attendanceService.getInventoryDetails(attendanceId));
    }

    @PutMapping("/update/{attendanceId}")
    public ResponseEntity<Attendance> updateCheckedIn(@PathVariable String attendanceId, @RequestBody CheckedIn requestDto) {
        return ResponseEntity.ok(attendanceService.updateAttendanceCheckIn(attendanceId, requestDto));

    }

    @GetMapping("/{attendanceId}")
    public ResponseEntity<AttendanceDetailsDTO> getAttendanceDetails(@PathVariable("attendanceId") String appointmentId) {
        return ResponseEntity.ok(attendanceService.getAttendanceById(appointmentId));
    }
}
