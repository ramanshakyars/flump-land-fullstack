package com.FlumpLandPlayZoneApplication.billing.service;

import com.FlumpLandPlayZoneApplication.billing.dto.BillingPaginatedResponse;
import com.FlumpLandPlayZoneApplication.billing.dto.BillingRequestDTO;
import com.FlumpLandPlayZoneApplication.billing.entity.Billing;
import com.FlumpLandPlayZoneApplication.inventory.entity.Inventory;
import com.FlumpLandPlayZoneApplication.inventory.service.InventoryService;
import com.FlumpLandPlayZoneApplication.user.dto.AttendanceDto;
import com.FlumpLandPlayZoneApplication.user.dto.BillingDto;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedRequest;
import com.FlumpLandPlayZoneApplication.user.entity.UserInfo;
import com.FlumpLandPlayZoneApplication.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class BillingServiceImpl implements BillingService {

    private final MongoTemplate mongoTemplate;
    private final InventoryService inventoryService;
    private final UserService userService;

    @Override
    public Billing createBill(BillingRequestDTO billingRequest) {
        log.info("Starting billing process for user ID: {}", billingRequest.getUserId());
        UserInfo user = validateUser(billingRequest.getUserId());
        Billing savedBilling = saveBillingRecord(billingRequest, user.getFullName());
        if (billingRequest.getInventories() != null) {
            billingRequest.getInventories().forEach(inventoryDto -> {
                    int quantity = Integer.parseInt(inventoryDto.getQuantity());
                    reduceStock(inventoryDto.getInventoryId(), quantity);
            });
        }
        updateUserBilling(user, savedBilling.getId(),savedBilling.getDate());
        log.info("Billing successfully created with ID: {}", savedBilling.getId());
        return savedBilling;
    }

    private Billing saveBillingRecord(BillingRequestDTO billingRequest, String fullName) {
        Billing billing = new Billing();
        billing.setUserId(billingRequest.getUserId());
        billing.setActivities(billingRequest.getActivities());
        billing.setTotalAmount(billingRequest.getTotalAmount());
        billing.setInventories(billingRequest.getInventories());
        billing.setPaymentMode(billingRequest.getPaymentMode());
        billing.setDate(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()));
        billing.setPaid(true);
        billing.setName(fullName);
        try {
           return mongoTemplate.save(billing);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save billing record.");
        }
    }

    private void updateUserBilling(UserInfo user, String billingId, Date billingDate) {
        BillingDto newBilling = new BillingDto();
        newBilling.setBillingId(billingId);
        newBilling.setDate(billingDate);
        newBilling.setDate(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()));
        List<BillingDto> updatedBillings = user.getBillings() != null ? user.getBillings() : new ArrayList<>();
        updatedBillings.add(newBilling);
        user.setBillings(updatedBillings);
        user.setPreviousBillPaid(true);
        user.setActivityAdded(false);
        if (user.getAttendance() != null){
            for (AttendanceDto attendance : user.getAttendance()){
                if (!attendance.isCheckOut()){
                    attendance.setCheckOut(true);
                }
            }
        }
        try {
            userService.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update user billing.", e);
        }
    }


    private UserInfo validateUser(String userId) {
        UserInfo user = userService.findById(userId);
        if (user == null) {
            log.error("User with ID {} not found.", userId);
            throw new IllegalArgumentException("User with ID " + userId + " not found.");
        }
        log.info("User validation successful: ID={}", user.getId());
        return user;
    }


    private void reduceStock(String inventoryId, int quantity) {
        Inventory inventory = inventoryService.getInventory(inventoryId);
        if (inventory.getTotalQuantity() < quantity) {
            throw new RuntimeException("Not enough stock available");
        }
        inventory.setTotalQuantity(inventory.getTotalQuantity() - quantity);
        inventoryService.save(inventory);
    }

    @Override
    public BillingPaginatedResponse getAllBilling(PaginatedRequest payload) {
        int page = Math.max(payload.getPage(), 0);
        int pageSize = payload.getPageSize() > 0 ? payload.getPageSize() : 10;
        Pageable pageable = PageRequest.of(page, pageSize);
        Query query = new Query().with(pageable);
        List<Billing> billingList = mongoTemplate.find(query, Billing.class);
        long totalRecords = mongoTemplate.count(new Query(), Billing.class);
        BillingPaginatedResponse billingPaginated = new BillingPaginatedResponse();
        billingPaginated.setBillingList(billingList);
        billingPaginated.setPage(page);
        billingPaginated.setTotalRecords((int) totalRecords);
        return billingPaginated;
    }

    @Override
    public Billing billingDetails(String id) {
        return mongoTemplate.findById(id, Billing.class);
    }

    @Override
    public List<Billing> getUserBillings(String userId) {
        Criteria criteria = Criteria.where("userId").is(userId);
        Query query = new Query(criteria);
        return mongoTemplate.find(query, Billing.class);
    }
}
