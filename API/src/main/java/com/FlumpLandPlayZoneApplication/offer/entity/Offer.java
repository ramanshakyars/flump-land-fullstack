package com.FlumpLandPlayZoneApplication.offer.entity;

import com.FlumpLandPlayZoneApplication.offer.dto.CreateOfferRequest;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "offers")
public class Offer {
    @Id
    private String id;
    private String offerName;
    private Long percentage;
    private Date start;
    private Date end;
    private Boolean isActive;
    private Boolean isDeleted = false;

    public static Offer createOffer(CreateOfferRequest offerRequest) {
        Offer offer = new Offer();
        offer.setOfferName(offerRequest.getOfferName());
        offer.setPercentage(offerRequest.getPercentage());
        offer.setStart(offerRequest.getStart());
        offer.setEnd(offerRequest.getEnd());
        offer.setIsActive(offerRequest.getIsActive());
        offer.setIsDeleted(false);
        return offer;
    }

}
