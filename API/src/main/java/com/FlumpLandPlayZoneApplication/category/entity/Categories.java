package com.FlumpLandPlayZoneApplication.category.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "categories")
public class Categories {
    @Id
    private String id;
    private String categoryName;
}
