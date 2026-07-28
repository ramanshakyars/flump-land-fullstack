package com.FlumpLandPlayZoneApplication.user.dto;


import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class RequestUserInfoDto {
    private String fullName;
    private LocalDateTime dateOfJoining;
    private Date dateOfBirth;
    private String mothersName;
    private String fatherName;
    private String parentContactNo;
    private String contactNumber;
    private String address;
}
