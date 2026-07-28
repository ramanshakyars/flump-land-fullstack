package com.FlumpLandPlayZoneApplication.category.service;

import com.FlumpLandPlayZoneApplication.category.entity.Categories;
import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.common.MessageConfig;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final MongoTemplate mongoTemplate;

    @Override
    public Categories createCategory(Categories categories) {
        return mongoTemplate.save(categories);
    }

    @Override
    public Categories updateCategory(Categories categories, String id) {
        categories.setId(id);
        return mongoTemplate.save(categories);
    }

    @Override
    public List<Categories> getAllCategory() {
        return mongoTemplate.findAll(Categories.class);
    }

    @Override
    public Categories findById(String id) {
        return mongoTemplate.findById(id, Categories.class);
    }

    @Override
    public APIResponseDTO deleteCategory(String id) {
       Categories categories = mongoTemplate.findById(id, Categories.class);
       mongoTemplate.remove(categories);
       return APIResponseDTO.builder().message(MessageConfig.DELETE_SUCCESSFULLY).status(HttpStatus.OK).build();
    }
}
