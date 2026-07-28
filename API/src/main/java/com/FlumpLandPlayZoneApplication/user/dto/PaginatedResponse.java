package com.FlumpLandPlayZoneApplication.user.dto;

import com.FlumpLandPlayZoneApplication.user.entity.UserInfo;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PaginatedResponse {
    private List<UserInfo> userInfoList;
    private int page;
    private int  totalRecords;
}
