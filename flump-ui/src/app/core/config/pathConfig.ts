import { environment } from '../../environments/environment';

export class PathConfig {
  public static get API_ENDPOINT(): string {
    return environment.API_URL;
  }

  public static GET_ALL_INVENTORY = `${PathConfig.API_ENDPOINT}/inventory`;
  public static DELETE_INVENTORY = `${PathConfig.API_ENDPOINT}/inventory`;
  public static GET_BY_ID_INVENTORY = `${PathConfig.API_ENDPOINT}/inventory`;
  public static UPDATE_INVENTORY = `${PathConfig.API_ENDPOINT}/inventory`;
  public static CREATE_INVENTORY = `${PathConfig.API_ENDPOINT}/inventory`;

  public static GET_ACTIVITY = `${PathConfig.API_ENDPOINT}/activity`;
  public static ADD_ACTIVITY = `${PathConfig.API_ENDPOINT}/activity`;
  public static EDIT_ACTIVITY = `${PathConfig.API_ENDPOINT}/activity`;
  public static DELETE_ACTIVITY = `${PathConfig.API_ENDPOINT}/activity`;

  public static GET_BY_ID_CATEGORY = `${PathConfig.API_ENDPOINT}/categories`;
  public static GET_ALL_CATEGORY = `${PathConfig.API_ENDPOINT}/categories`;
  public static CREATE_CATEGORY = `${PathConfig.API_ENDPOINT}/categories`;
  public static UPDATE_CATEGORY = `${PathConfig.API_ENDPOINT}/categories`;
  public static DELETE_CATEGORY = `${PathConfig.API_ENDPOINT}/categories`;

  // bills
  public static GET_BILLS = `${PathConfig.API_ENDPOINT}/billing/paginated`;
  public static GET_USER_NAME_BY_ID = `${PathConfig.API_ENDPOINT}/user`;

  // Children Endpoint
  public static GET_ALL_CHILDREN_DATA = `${PathConfig.API_ENDPOINT}/user/paginated`;
  public static POST_CHILDREN_DATA = `${PathConfig.API_ENDPOINT}/user/create`;
  public static UPDATE_CHILDREN_DATA = `${PathConfig.API_ENDPOINT}/user`;
  public static DOWNLOAD_EXCEL = `${PathConfig.API_ENDPOINT}/user/download-excel`;

  // Attendance Endpoint

  public static POST_CHECK_IN = `${PathConfig.API_ENDPOINT}/attendance/check-in`;
  public static POST_CHECK_OUT = `${PathConfig.API_ENDPOINT}/attendance/check-out`;
  public static UPDATE_ATTENDANCE = `${PathConfig.API_ENDPOINT}/attendance/update`;
  public static GET_ATTENDANCE_BY_ID = `${PathConfig.API_ENDPOINT}/attendance`;
  public static GET_INVENTORY_FROM_ATTENDANCE = `${PathConfig.API_ENDPOINT}/attendance/info`;
  public static GET_ALL_ATTENANCE_INFO = `${PathConfig.API_ENDPOINT}/attendance/paginated`;

  // Billing
  public static CREATE_BILL = `${PathConfig.API_ENDPOINT}/billing`;

  //
  public static CREATE_OFFER = `${PathConfig.API_ENDPOINT}/offers`;
  public static UPDATE_OFFERS = `${PathConfig.API_ENDPOINT}/offers`;
  public static GET_ALL_OFFER = `${PathConfig.API_ENDPOINT}/offers`;
  public static DELETE_OFFER = `${PathConfig.API_ENDPOINT}/offers`;
}
