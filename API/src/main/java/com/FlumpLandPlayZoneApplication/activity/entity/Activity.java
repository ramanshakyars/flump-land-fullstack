package com.FlumpLandPlayZoneApplication.activity.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "activity")
public class Activity {

    @Id
    private String id;
    private String activityName;
    private int price;

    public static Activity createActivity(Activity payload){
        Activity activity = new Activity();
        activity.setActivityName(payload.activityName);
        activity.setPrice(payload.getPrice());
        return activity;
    }
}
