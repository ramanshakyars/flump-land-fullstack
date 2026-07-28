package com.FlumpLandPlayZoneApplication.activity.service;

import com.FlumpLandPlayZoneApplication.activity.entity.Activity;
import java.util.List;

public interface ActivityService {
    Activity create(Activity activity);
    Activity updateActivityDetails(Activity activity, String id);
    List<Activity> getAllActivity();
    Activity getActivityInfo(String id);
    void deleteActivity(String id);
    Activity findById(String id);
}
