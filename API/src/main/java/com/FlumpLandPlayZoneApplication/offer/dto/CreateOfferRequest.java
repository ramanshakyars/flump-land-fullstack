package com.FlumpLandPlayZoneApplication.offer.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.Date;

/**
 * @author kuldeep_ydav
 */
@Data
public class CreateOfferRequest {

    @NotBlank(message = "Offer name is required")
    private String offerName;
    @NotNull(message = "Percentage is required")
    @Min(value = 1, message = "Percentage must be at least 1%")
    @Max(value = 100, message = "Percentage cannot exceed 100%")
    private Long percentage;
    @NotNull(message = "Start date is required")
    private Date start;
    @NotNull(message = "End date is required")
    private Date end;
    private Boolean isActive;
}
