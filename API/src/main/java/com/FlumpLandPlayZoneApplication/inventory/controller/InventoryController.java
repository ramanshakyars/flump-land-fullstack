package com.FlumpLandPlayZoneApplication.inventory.controller;

import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.inventory.entity.Inventory;
import com.FlumpLandPlayZoneApplication.inventory.service.InventoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "inventory")
@RestController
@AllArgsConstructor
@Slf4j
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping()
    public ResponseEntity<Inventory> createInventory(@RequestBody Inventory inventory) {
        return ResponseEntity.ok(inventoryService.createInventory(inventory));
    }

    @PutMapping("{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable("id") String id, @RequestBody Inventory inventory) {
        return ResponseEntity.ok(inventoryService.updateInventory(inventory, id));
    }

    @DeleteMapping("{id}")
    public APIResponseDTO deleteInventory(@PathVariable("id") String id) {
        log.info("delete inventory with i'd {}", id);
        return inventoryService.deleteInventory(id);

    }

    @GetMapping()
    public ResponseEntity<List<Inventory>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @GetMapping("{id}")
    public ResponseEntity<Inventory> getInventory(@PathVariable("id") String id) {
        return ResponseEntity.ok(inventoryService.getInventory(id));
    }
}
