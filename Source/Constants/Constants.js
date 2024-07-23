import { Dimensions } from "react-native";

export const BANNER_H = Dimensions.get('window').height * 0.84;
export const TOPNAVI_H = 50;

// 192.168.1.6
export const API_BASE_URL = 'https://zpiyushviiitoutlets-backend.onrender.com';
// export const FIREBASE_TOPIC_NAME = 'all_devices_testing';
// End Point of Other Component
export const LOGIN_ENDPOINT = '/login';
export const REGISTER_ENDPOINT = '/register';
export const USERSDATA_ENDPOINT = '/userdata';
export const ADDOUTLET_ENDPOINT = '/addoutlet';
export const ADDMENU_ENDPOINT = '/addmenu';
export const USEROUTLETS_ENDPOINT = '/useroutlets';
export const USERMENU_ENDPOINT = '/usermenu';
export const ALLOUTLETS_ENDPOINT = '/alloutlets';
export const ORDERS_ENDPOINT = '/createorder';
export const ORDERSSELLER_ENDPOINT = '/getorderseller';
