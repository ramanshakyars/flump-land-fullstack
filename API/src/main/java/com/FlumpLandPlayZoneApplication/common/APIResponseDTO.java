package com.FlumpLandPlayZoneApplication.common;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@Builder
public class APIResponseDTO {
    private HttpStatus status;
    private String message;
}
