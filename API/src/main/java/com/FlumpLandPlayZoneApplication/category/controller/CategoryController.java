package com.FlumpLandPlayZoneApplication.category.controller;

import com.FlumpLandPlayZoneApplication.category.entity.Categories;
import com.FlumpLandPlayZoneApplication.category.service.CategoryService;
import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "categories")
@AllArgsConstructor
@RestController
public class CategoryController {
    private CategoryService categoryService;

    @PostMapping()
    public ResponseEntity<Categories> createCategory(@RequestBody Categories categories) {
        return ResponseEntity.ok(categoryService.createCategory(categories));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categories> updateCategory(@RequestBody Categories categories, @PathVariable("id") String id) {
        return ResponseEntity.ok(categoryService.updateCategory(categories, id));
    }

    @GetMapping()
    public ResponseEntity<List<Categories>> getAllCategory() {
        return ResponseEntity.ok(categoryService.getAllCategory());
    }

    @GetMapping("{id}")
    public ResponseEntity<Categories> findById(@PathVariable("id") String id) {
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<APIResponseDTO> deleteCategory(@PathVariable("id") String id) {
        return ResponseEntity.ok(categoryService.deleteCategory(id));
    }
}
