package com.FlumpLandPlayZoneApplication.user.controller;

import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedRequest;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedResponse;
import com.FlumpLandPlayZoneApplication.user.dto.RequestUserInfoDto;
import com.FlumpLandPlayZoneApplication.user.entity.UserInfo;
import com.FlumpLandPlayZoneApplication.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping(value = "user")
@RestController
@AllArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<UserInfo> createUser(@RequestBody RequestUserInfoDto userInfo){
        return ResponseEntity.ok(userService.create(userInfo));
    }

    @PostMapping("paginated")
    public ResponseEntity<PaginatedResponse> getAllUser(@RequestBody PaginatedRequest payload){
        return ResponseEntity.ok(userService.findAll(payload));
    }

    @GetMapping("{id}")
    public ResponseEntity<UserInfo> findById(@PathVariable("id") String id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<UserInfo> updateUserInfo(@RequestBody UserInfo userInfo, @PathVariable("id") String id){
        return ResponseEntity.ok(userService.updateUserInfo(userInfo, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponseDTO> deleteUser(@PathVariable("id") String id){
        return ResponseEntity.ok(userService.deleteUserInfo(id));
    }

    @GetMapping("/download-excel")
    public ResponseEntity<byte[]> downloadUserExcel() {
        try {
            byte[] excelData = userService.generateCompleteExcel();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users.xlsx")
                    .header(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                    .body(excelData);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
