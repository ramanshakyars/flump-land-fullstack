package com.FlumpLandPlayZoneApplication.billing.entity;

import com.FlumpLandPlayZoneApplication.activity.entity.Activity;
import com.FlumpLandPlayZoneApplication.billing.dto.InventoryBillingDto;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "billings")
public class Billing {
    @Id
    private String id;
    private String userId;
    private String name;
    private List<Activity> activities;
    private List<InventoryBillingDto> inventories;
    private BigDecimal totalAmount;
    private PaymentMode paymentMode;
    private Date date;
    private boolean isPaid;

}
