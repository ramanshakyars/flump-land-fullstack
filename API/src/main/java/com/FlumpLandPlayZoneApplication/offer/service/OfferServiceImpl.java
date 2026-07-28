package com.FlumpLandPlayZoneApplication.offer.service;

import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.common.MessageConfig;
import com.FlumpLandPlayZoneApplication.offer.dto.CreateOfferRequest;
import com.FlumpLandPlayZoneApplication.offer.entity.Offer;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class OfferServiceImpl implements OfferService {

    private final MongoTemplate mongoTemplate;

    @Override
    public Offer createNewOffer(CreateOfferRequest offer) {
        return mongoTemplate.save(Offer.createOffer(offer));
    }

    @Override
    public Offer UpdateOfferDetails(Offer offer, String id) {
        offer.setId(id);
        mongoTemplate.save(offer);
        return offer;
    }

    @Override
    public List<Offer> getAllOffer() {
        return mongoTemplate.findAll(Offer.class);
    }

    @Override
    public Offer getOfferDetails(String id) {
        return findById(id);
    }

    @Override
    public APIResponseDTO deleteOffer(String id) {
        Offer offer = mongoTemplate.findById(id, Offer.class);
        offer.setIsDeleted(true);
        offer.setIsActive(false);
        mongoTemplate.save(offer);
        return APIResponseDTO.builder().status(HttpStatus.OK)
                .message(MessageConfig.DELETE_SUCCESSFULLY).build();
    }

    private Offer findById(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        return mongoTemplate.findOne(query, Offer.class);
    }
}
