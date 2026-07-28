package com.FlumpLandPlayZoneApplication.user.service;

import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedRequest;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedResponse;
import com.FlumpLandPlayZoneApplication.user.dto.RequestUserInfoDto;
import com.FlumpLandPlayZoneApplication.user.entity.UserInfo;

public interface UserService {
    UserInfo findById(String id);
    PaginatedResponse findAll(PaginatedRequest payload);
    UserInfo create(RequestUserInfoDto userInfo);
    UserInfo updateUserInfo(UserInfo userInfo,String id);
    UserInfo save (UserInfo userInfo);
    APIResponseDTO deleteUserInfo(String id);
    byte[] generateCompleteExcel();
}
