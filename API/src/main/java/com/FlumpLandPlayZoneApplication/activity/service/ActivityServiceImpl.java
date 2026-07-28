package com.FlumpLandPlayZoneApplication.activity.service;

import com.FlumpLandPlayZoneApplication.activity.entity.Activity;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
@Slf4j
public class ActivityServiceImpl implements ActivityService {

    private final MongoTemplate mongoTemplate;

    @Override
    public Activity create(Activity activity) {
        return mongoTemplate.save(Activity.createActivity(activity));
    }

    @Override
    public Activity updateActivityDetails(Activity activity, String id) {
        log.info("update activity info {}", activity);
        activity.setId(id);
        mongoTemplate.save(activity);
        return activity;
    }

    @Override
    public List<Activity> getAllActivity() {
        log.info("get all activity list");
        return mongoTemplate.findAll(Activity.class);
    }

    @Override
    public Activity getActivityInfo(String id) {
        log.info("get Activity details i'd {}", id);
        return mongoTemplate.findById(id, Activity.class);
    }

    @Override
    public void deleteActivity(String id) {
        log.info("Delete Activity of {}", id);
        mongoTemplate.remove(mongoTemplate.findById(id,Activity.class));
    }

    @Override
    public Activity findById(String id) {
        log.info("find Activity info of i'd {}",id);
        return mongoTemplate.findById(id, Activity.class);
    }
}
