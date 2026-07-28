package com.FlumpLandPlayZoneApplication.inventory.service;


import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.inventory.entity.Inventory;

import java.util.List;

public interface InventoryService {
    Inventory createInventory(Inventory inventory);

    Inventory updateInventory(Inventory inventory, String id);

    APIResponseDTO deleteInventory(String id);

    List<Inventory> getAllInventory();

    Inventory getInventory(String id);

    Inventory save(Inventory save);
}
