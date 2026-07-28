package com.FlumpLandPlayZoneApplication.category.service;

import com.FlumpLandPlayZoneApplication.category.entity.Categories;
import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;

import java.util.List;

public interface CategoryService {

    Categories createCategory(Categories categories);
    Categories updateCategory(Categories categories, String id);
    List<Categories> getAllCategory();
    Categories findById(String id);
    APIResponseDTO deleteCategory(String id);

}
