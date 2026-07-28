package com.FlumpLandPlayZoneApplication.user.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PaginatedRequest {
    private int page;
    private int pageSize;
    private String searchText;
    private Date startDate;
    private Date endData;

}
