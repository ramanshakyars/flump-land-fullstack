package com.FlumpLandPlayZoneApplication.activity.controller;

import com.FlumpLandPlayZoneApplication.activity.entity.Activity;
import com.FlumpLandPlayZoneApplication.activity.service.ActivityService;
import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.common.MessageConfig;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping(value = "activity")
@AllArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping()
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activity){
        return ResponseEntity.ok(activityService.create(activity));
    }

    @PutMapping("{id}")
    public ResponseEntity<Activity> updateActivityDetails(@PathVariable("id") String id,@RequestBody Activity activity){
        return ResponseEntity.ok(activityService.updateActivityDetails(activity,id));
    }

    @GetMapping()
    public ResponseEntity<List<Activity>> getAllActivity(){
        return ResponseEntity.ok(activityService.getAllActivity());
    }

    @GetMapping("{id}")
    public ResponseEntity<Activity> getActivityInfo(@PathVariable("id") String id){
        return ResponseEntity.ok(activityService.getActivityInfo(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponseDTO> deleteActivity(@PathVariable("id") String id){
        activityService.deleteActivity(id);
        return ResponseEntity.ok(APIResponseDTO.builder().status(HttpStatus.OK).message(MessageConfig.DELETE_SUCCESSFULLY).build());
    }

}
