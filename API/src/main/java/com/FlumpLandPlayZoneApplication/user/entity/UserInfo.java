package com.FlumpLandPlayZoneApplication.user.entity;

import com.FlumpLandPlayZoneApplication.user.dto.AttendanceDto;
import com.FlumpLandPlayZoneApplication.user.dto.BillingDto;
import com.FlumpLandPlayZoneApplication.user.dto.RequestUserInfoDto;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.*;
import java.util.List;
import java.util.Date;

@Data
@Document(collection = "users")
public class UserInfo {
    @Id
    private String id;
    private String fullName;
    private LocalDateTime dateOfJoining;
    private Date dateOfBirth;
    private String mothersName;
    private String fatherName;
    private String parentContactNo;
    private String address;
    private List<AttendanceDto> attendance;
    private List<BillingDto> billings;
    private boolean isDelete = false;
    private boolean isCheckedIn = false;
    private boolean isPreviousBillPaid = true;
    private boolean isActivityAdded = false;


    public static UserInfo getInstance(RequestUserInfoDto requestUserInfoDto) {
        UserInfo userInfo = new UserInfo();
        userInfo.setFullName(requestUserInfoDto.getFullName());
        userInfo.setDateOfJoining(requestUserInfoDto.getDateOfJoining());
        userInfo.setDateOfBirth(requestUserInfoDto.getDateOfBirth());
        userInfo.setMothersName(requestUserInfoDto.getMothersName());
        userInfo.setFatherName(requestUserInfoDto.getFatherName());
        userInfo.setParentContactNo(requestUserInfoDto.getParentContactNo());
        userInfo.setAddress(requestUserInfoDto.getAddress());
        userInfo.setDelete(false);
        userInfo.setCheckedIn(false);
        userInfo.setPreviousBillPaid(true);
        userInfo.setActivityAdded(false);
        return userInfo;
    }
}
