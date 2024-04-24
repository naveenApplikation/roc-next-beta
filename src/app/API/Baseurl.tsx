import axios from "axios";
import {ApiResponse} from '@/app/utils/types'

const baseUrl = "https://roc-web-app.uc.r.appspot.com";

if (typeof window !== 'undefined') {
    // Your code that interacts with localStorage
}



export const fetchDatAll = async (endpoint: string): Promise<any> => {

    const token = localStorage.getItem("Token");

    try {
      const response = await axios.get(`${baseUrl}/${endpoint}`, {
        headers: {
          "x-auth-token": `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
  };

export const fetchData = async (name: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${baseUrl}/${name}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

interface ApiVerifyCodeResponse {
  message: string;
  data: any;
}

export const verifyInviteCode = async (code: string): Promise<ApiVerifyCodeResponse> => {
  try {
    const response = await axios.post<ApiVerifyCodeResponse>(`${baseUrl}/verifyCode`,{ code });
    return response.data;
  } catch (error) {
    throw new Error("Failed to verify invite code");
  }
};


  
