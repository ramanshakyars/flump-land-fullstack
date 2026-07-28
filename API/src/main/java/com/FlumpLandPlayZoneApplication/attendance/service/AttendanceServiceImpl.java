package com.FlumpLandPlayZoneApplication.attendance.service;

import com.FlumpLandPlayZoneApplication.activity.entity.Activity;
import com.FlumpLandPlayZoneApplication.activity.service.ActivityService;
import com.FlumpLandPlayZoneApplication.attendance.dto.*;
import com.FlumpLandPlayZoneApplication.attendance.entity.Attendance;
import com.FlumpLandPlayZoneApplication.inventory.entity.Inventory;
import com.FlumpLandPlayZoneApplication.inventory.service.InventoryService;
import com.FlumpLandPlayZoneApplication.user.dto.AttendanceDto;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedRequest;
import com.FlumpLandPlayZoneApplication.user.entity.UserInfo;
import com.FlumpLandPlayZoneApplication.user.service.UserService;
import com.mongodb.client.result.UpdateResult;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final MongoTemplate mongoTemplate;
    private final UserService userService;
    private final ActivityService activityService;
    private final InventoryService inventoryService;

    private static List<ActivityDto> createDto(Attendance attendance) {
        List<ActivityDto> activityDtos = attendance.getActivities().stream()
                .map(activity -> {
                    ActivityDto dto = new ActivityDto();
                    dto.setActivityName(activity.getActivityName());
                    dto.setPrice(activity.getPrice());
                    return dto;
                }).collect(Collectors.toList());
        return activityDtos;
    }

    @Override
    public void markAttendanceCheckIn(CheckedIn requestDto) {
        UserInfo userInfo = userService.findById(requestDto.getUserId());
        if (userInfo == null) {
            throw new IllegalArgumentException("User not found with ID: " + requestDto.getUserId());
        }
        LocalDate today = LocalDate.now();
        Attendance attendance = new Attendance();
        attendance.setUserId(requestDto.getUserId());
        attendance.setDate(java.sql.Date.valueOf(today));
        attendance.setActivities(new ArrayList<>());
        attendance.setInventories(new ArrayList<>());
        attendance.setCheckIn(LocalDateTime.now());
        createActivityDto(requestDto, attendance);
        createPurchaseDto(requestDto, attendance);
        attendance = mongoTemplate.save(attendance);
        if (userInfo.getAttendance() == null) {
            userInfo.setAttendance(new ArrayList<>());
        }
        AttendanceDto attendanceDto = new AttendanceDto();
        attendanceDto.setAttendanceId(attendance.getId());
        attendanceDto.setDate(java.sql.Date.valueOf(today));
        attendanceDto.setCheckOut(false);
        userInfo.getAttendance().add(attendanceDto);
        userInfo.setCheckedIn(true);
        userInfo.setPreviousBillPaid(false);
        mongoTemplate.save(userInfo);
    }

    private void createActivityDto(CheckedIn requestDto, Attendance attendance) {
        if (requestDto.getActivities() != null && !requestDto.getActivities().isEmpty()) {
            List<Activity> activityList = requestDto.getActivities().stream()
                    .map(activityService::getActivityInfo)
                    .toList();
            attendance.getActivities().addAll(activityList);
        }
    }

    private static void createPurchaseDto(CheckedIn requestDto, Attendance attendance) {
        if (requestDto.getInventories() != null && !requestDto.getInventories().isEmpty()) {
            List<PurchasedItems> inventoryList = requestDto.getInventories().stream()
                    .map(dto -> new PurchasedItems(dto.getInventoryId(), dto.getQuantity()))
                    .toList();
            attendance.getInventories().addAll(inventoryList);
        }
    }

    @Override
    public AttendancePaginatedResponse getUserAttendance(String userId, PaginatedRequest request) {
        Criteria criteria = Criteria.where("userId").is(userId);
        Query query = new Query(criteria);
        query.with(Sort.by(Sort.Direction.DESC, "checkIn"));
        long totalRecords = mongoTemplate.count(query, Attendance.class);
        PageRequest pageRequest = PageRequest.of(request.getPage(), request.getPageSize());
        query.with(pageRequest);
        List<Attendance> attendanceList = mongoTemplate.find(query, Attendance.class);
        return AttendancePaginatedResponse.builder()
                .totalRecords(String.valueOf(totalRecords)).page(String.valueOf(request.getPage()))
                .attendanceList(attendanceList).build();
    }


    @Override
    public InventoryResponse getInventoryDetails(String attendanceId) {
        Attendance attendance = mongoTemplate.findById(attendanceId, Attendance.class);
        if (attendance == null) {
            throw new RuntimeException("Attendance record not found for ID: " + attendanceId);
        }
        final var activity = createDto(attendance);
        final var inventory = inventoryResponse(attendance);
        InventoryResponse response = new InventoryResponse();
        response.setDate(attendance.getDate());
        response.setCheckIn(attendance.getCheckIn());
        response.setCheckOut(attendance.getCheckout());
        response.setActivityList(activity);
        response.setInventoryList(inventory);
        return response;
    }

    private List<InventoryDto> inventoryResponse(Attendance attendance) {
        List<InventoryDto> inventoryDtos = attendance.getInventories().stream()
                .map(inventoryItem -> {
                    Inventory inventory = inventoryService.getInventory(inventoryItem.getInventoryId());
                    InventoryDto dto = new InventoryDto();
                    dto.setInventoryId(inventory.getId());
                    dto.setName(inventory.getName());
                    dto.setQuantity(inventoryItem.getQuantity());
                    return dto;
                }).collect(Collectors.toList());
        return inventoryDtos;
    }

    @Override
    public Attendance updateAttendanceCheckIn(String attendanceId, CheckedIn requestDto) {
        Attendance existingAttendance = mongoTemplate.findById(attendanceId, Attendance.class);
        UserInfo userInfo = userService.findById(requestDto.getUserId());
        userInfo.setActivityAdded(true);
        mongoTemplate.save(userInfo);
        if (existingAttendance != null) {
            existingAttendance.setUserId(requestDto.getUserId());
            List<Activity> updatedActivities = requestDto.getActivities().stream()
                    .map(activityService::getActivityInfo).collect(Collectors.toList());
            existingAttendance.setActivities(updatedActivities);
            List<PurchasedItems> updatedInventories = requestDto.getInventories().stream()
                    .map(item -> new PurchasedItems(item.getInventoryId(), item.getQuantity())).toList();
            existingAttendance.setInventories(updatedInventories);
            mongoTemplate.save(existingAttendance);
            return existingAttendance;
        } else {
            throw new RuntimeException("Attendance record not found for ID: " + attendanceId);
        }
    }

    @Override
    public AttendanceDetailsDTO getAttendanceById(String id) {
        Attendance attendance = mongoTemplate.findById(id, Attendance.class);
        if (attendance == null) {
            throw new RuntimeException("Attendance record not found for ID: " + id);
        }
        List<PurchasedItemsDTO> purchasedItemsDTOs = new ArrayList<>();
        inventoryResponse(attendance, purchasedItemsDTOs);
        return  createResponse(attendance, purchasedItemsDTOs);
    }

    private void inventoryResponse(Attendance attendance, List<PurchasedItemsDTO> purchasedItemsDTOs) {
        if (attendance.getInventories() != null) {
            attendance.getInventories().forEach(inventory -> {
                Inventory puchasedInventory = mongoTemplate.findById(inventory.getInventoryId(), Inventory.class);
                PurchasedItemsDTO dto = new PurchasedItemsDTO();
                if (puchasedInventory != null) {
                    purchaseDto(inventory, dto, puchasedInventory);
                }
                purchasedItemsDTOs.add(dto);
            });
        }
    }

    private static void purchaseDto(PurchasedItems inventory, PurchasedItemsDTO dto, Inventory puchasedInventory) {
        dto.setInventoryId(puchasedInventory.getId());
        dto.setName(puchasedInventory.getName());
        dto.setQuantity(inventory.getQuantity());
        dto.setPrice(puchasedInventory.getPrice());
        dto.setInventoryType(puchasedInventory.getInventoryType());
        dto.setTotalAmount(puchasedInventory.getPrice().multiply(new BigDecimal(inventory.getQuantity())));
    }

    private static AttendanceDetailsDTO createResponse(Attendance attendance, List<PurchasedItemsDTO> purchasedItemsDTOs) {
        AttendanceDetailsDTO attendanceDetailsDTO = new AttendanceDetailsDTO();
        attendanceDetailsDTO.setUserId(attendance.getUserId());
        attendanceDetailsDTO.setId(attendance.getId());
        attendanceDetailsDTO.setDate(attendance.getDate());
        attendanceDetailsDTO.setCheckIn(attendance.getCheckIn());
        attendanceDetailsDTO.setCheckout(attendance.getCheckout());
        attendanceDetailsDTO.setActivities(attendance.getActivities());
        attendanceDetailsDTO.setInventories(purchasedItemsDTOs);
        return attendanceDetailsDTO;
    }

    @Override
    public void markAttendanceCheckOut(String attendanceId) {
        Attendance checkedInAttendance = mongoTemplate.findById(attendanceId, Attendance.class);
        UserInfo userInfo = userService.findById(checkedInAttendance.getUserId());
        if (userInfo == null) {
            throw new IllegalArgumentException("User not found with ID: " + checkedInAttendance.getUserId());
        }
        Criteria criteria = Criteria.where("userId").is(checkedInAttendance.getUserId());
        Query query = new Query(criteria);
        List<Attendance> attendanceList = mongoTemplate.find(query, Attendance.class);
        if (attendanceList.isEmpty()) {
            throw new IllegalStateException("No attendance record found for this attendance Id");
        }

        if (checkedInAttendance == null) {
            throw new IllegalStateException("No valid check-in found or already checked out.");
        }
        checkedInAttendance.setCheckout(LocalDateTime.now());
        mongoTemplate.save(checkedInAttendance);
        Query userInfoQuery = Query.query(
                Criteria.where("id").is(checkedInAttendance.getUserId()).and("attendance.isCheckOut").is(false)
        );
        Update update = new Update().set("isCheckedIn", false);
        UpdateResult result = mongoTemplate.updateFirst(userInfoQuery, update, UserInfo.class);
        if (result.getMatchedCount() == 0) {
            throw new IllegalStateException("No valid check-in found in embedded attendance or already checked out.");
        }
    }

}
