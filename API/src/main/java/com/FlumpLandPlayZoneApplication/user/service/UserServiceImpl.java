package com.FlumpLandPlayZoneApplication.user.service;

import com.FlumpLandPlayZoneApplication.activity.entity.Activity;
import com.FlumpLandPlayZoneApplication.attendance.entity.Attendance;
import com.FlumpLandPlayZoneApplication.billing.entity.Billing;
import com.FlumpLandPlayZoneApplication.category.entity.Categories;
import com.FlumpLandPlayZoneApplication.common.APIResponseDTO;
import com.FlumpLandPlayZoneApplication.common.MessageConfig;
import com.FlumpLandPlayZoneApplication.inventory.entity.Inventory;
import com.FlumpLandPlayZoneApplication.offer.entity.Offer;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedRequest;
import com.FlumpLandPlayZoneApplication.user.dto.PaginatedResponse;
import com.FlumpLandPlayZoneApplication.user.dto.RequestUserInfoDto;
import com.FlumpLandPlayZoneApplication.user.entity.UserInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final MongoTemplate mongoTemplate;

    @Override
    public UserInfo findById(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        return mongoTemplate.findOne(query, UserInfo.class);
    }

    @Override
    public PaginatedResponse findAll(PaginatedRequest request) {
        int page = Math.max(request.getPage(), 0);
        int pageSize = request.getPageSize() > 0 ? request.getPageSize() : 10;
        Pageable pageable = PageRequest.of(page, pageSize);
        Criteria criteria = Criteria.where("isDelete").in(false);
        if (request.getSearchText() != null && !request.getSearchText().trim().isEmpty()) {
            String regexPattern = ".*" + request.getSearchText() + ".*";
            Criteria searchCriteria = new Criteria().orOperator(
                    Criteria.where("fullName").regex(regexPattern, "i"),
                    Criteria.where("parentContactNo").regex(regexPattern, "i"),
                    Criteria.where("fatherName").regex(regexPattern, "i")
            );
            criteria = criteria.andOperator(searchCriteria);
        }
        if (request.getStartDate() != null && request.getEndData() != null) {
            criteria = criteria.and("dateOfJoining").gte(request.getStartDate()).lte(request.getEndData());
        }
        Query query = new Query(criteria).with(Sort.by(Sort.Direction.DESC, "dateOfJoining")).with(pageable);
        List<UserInfo> users = mongoTemplate.find(query, UserInfo.class);
        Criteria criteria1 = Criteria.where("isDelete").in(true, false);
        long totalRecords = mongoTemplate.count(new Query(criteria1), UserInfo.class);
        return PaginatedResponse.builder()
                .userInfoList(users).page(page).totalRecords((int) totalRecords).build();
    }

    @Override
    public UserInfo create(RequestUserInfoDto userInfoDto) {
        return mongoTemplate.save(UserInfo.getInstance(userInfoDto));
    }

    @Override
    public UserInfo updateUserInfo(UserInfo userInfo, String id) {
        userInfo.setId(id);
        return mongoTemplate.save(userInfo);
    }

    @Override
    public UserInfo save(UserInfo userInfo) {
        return mongoTemplate.save(userInfo);
    }

    @Override
    public APIResponseDTO deleteUserInfo(String id) {
        UserInfo userInfo = findById(id);
        userInfo.setDelete(true);
        mongoTemplate.remove(userInfo);
        return APIResponseDTO.builder().message(MessageConfig.DELETE_SUCCESSFULLY).status(HttpStatus.OK).build();
    }

    @Override
    public byte[] generateCompleteExcel() {
        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            createJsonSheet(workbook, "Users", findAllUser());
            createJsonSheet(workbook, "Offers", findAllOffers());
            createJsonSheet(workbook, "Inventory", findAllInventory());
            createJsonSheet(workbook, "Category", findAllCategories());
            createJsonSheet(workbook, "Billings", findAllBillingData());
            createJsonSheet(workbook, "Attendance", findAllAttendance());
            createJsonSheet(workbook, "Activity", findAllActivities());
            workbook.write(outputStream);
            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Error generating Excel file", e);
        }
    }

    private <T> void createJsonSheet(Workbook workbook, String sheetName, List<T> dataList) {
        Sheet sheet = workbook.createSheet(sheetName);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        if (dataList.isEmpty()) {
            return;
        }
        Field[] fields = dataList.get(0).getClass().getDeclaredFields();
        List<String> headers = new ArrayList<>();
        for (Field field : fields) {
            headers.add(field.getName());
        }
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.size(); i++) {
            headerRow.createCell(i).setCellValue(headers.get(i));
        }
        int rowIdx = 1;
        for (T data : dataList) {
            Row row = sheet.createRow(rowIdx++);
            int colIdx = 0;
            for (Field field : fields) {
                field.setAccessible(true);
                try {
                    Object value = field.get(data);

                    if (value instanceof Date) {
                        row.createCell(colIdx).setCellValue(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(value));
                    } else if (value instanceof List) {
                        row.createCell(colIdx).setCellValue(objectMapper.writeValueAsString(value));
                    } else {
                        row.createCell(colIdx).setCellValue(value != null ? value.toString() : "");
                    }
                } catch (IllegalAccessException | JsonProcessingException e) {
                    row.createCell(colIdx).setCellValue("ERROR");
                }
                colIdx++;
            }
        }
    }

    private List<UserInfo> findAllUser(){
        return mongoTemplate.findAll(UserInfo.class);
    }

    private List<Billing> findAllBillingData(){
        return mongoTemplate.findAll(Billing.class);
    }

    private List<Offer> findAllOffers(){
        return mongoTemplate.findAll(Offer.class);
    }

    private List<Inventory> findAllInventory(){
        return mongoTemplate.findAll(Inventory.class);
    }

    private List<Categories> findAllCategories(){
        return mongoTemplate.findAll(Categories.class);
    }

    private List<Attendance> findAllAttendance() {
        return mongoTemplate.findAll(Attendance.class);
    }


    private List<Activity> findAllActivities(){
        return mongoTemplate.findAll(Activity.class);
    }

}
