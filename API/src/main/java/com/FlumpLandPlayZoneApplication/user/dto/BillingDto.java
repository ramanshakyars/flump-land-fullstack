package com.FlumpLandPlayZoneApplication.user.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BillingDto {
    private Date date;
    private String billingId;
}
