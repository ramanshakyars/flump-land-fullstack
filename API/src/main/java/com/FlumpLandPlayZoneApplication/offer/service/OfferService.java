package com.FlumpLandPlayZoneApplication.offer.service;

import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.offer.dto.CreateOfferRequest;
import com.FlumpLandPlayZoneApplication.offer.entity.Offer;

import java.util.List;

public interface OfferService {
    Offer createNewOffer(CreateOfferRequest offer);

    Offer UpdateOfferDetails(Offer offer, String id);

    List<Offer> getAllOffer();

    Offer getOfferDetails(String id);

    APIResponseDTO deleteOffer(String id);

}
