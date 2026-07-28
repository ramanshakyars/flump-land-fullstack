package com.FlumpLandPlayZoneApplication.offer.controller;

import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.offer.dto.CreateOfferRequest;
import com.FlumpLandPlayZoneApplication.offer.entity.Offer;
import com.FlumpLandPlayZoneApplication.offer.service.OfferService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "offers")
@RestController
@AllArgsConstructor
public class OfferController {
    private final OfferService offerService;

    @PostMapping()
    public ResponseEntity<Offer> createNewOffer(@RequestBody CreateOfferRequest offer) {
        return ResponseEntity.ok(offerService.createNewOffer(offer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOfferDetails(@PathVariable("id") String id, @RequestBody Offer offer) {
        return ResponseEntity.ok(offerService.UpdateOfferDetails(offer, id));
    }

    @GetMapping()
    public ResponseEntity<List<Offer>> getOffers() {
        return ResponseEntity.ok(offerService.getAllOffer());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferDetails(@PathVariable("id") String id) {
        Offer offer = offerService.getOfferDetails(id);
        if (offer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(offer);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<APIResponseDTO> deleteOffersDetails(@PathVariable("id") String id) {
        return ResponseEntity.ok(offerService.deleteOffer(id));
    }
}
