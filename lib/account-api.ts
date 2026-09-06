import { LoginDTO, LoginSuccessDTO, RegisterDTO } from "./dtos";

import { authenticatedRequest } from "../app/interceptor";
import axios from "axios";

const accountApiUrl = "http://localhost:5276/api/Account/";


export const login = async (loginData: LoginDTO) => {
    const { data } = await axios.post(accountApiUrl + 'Login', loginData);
    completeLogin(data);
}

export const register = async (user: RegisterDTO):Promise<void> => {
  const { data } = await authenticatedRequest.post(accountApiUrl + 'Register', user);
  completeLogin(data);
}

function completeLogin(data: LoginSuccessDTO) {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('playerId', data.playerId.toString());
    sessionStorage.setItem('playerName', data.playerName);
    console.log('Login completed with:', data);
}

export const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('playerId');
    sessionStorage.removeItem('playerName');
    console.log('Logged out successfully');
}

export const publicData = async () => {
    try {
        const { data } = await axios.get(accountApiUrl + 'PublicData');
        return data;
    } catch (error) {
        console.error('Error fetching Public API status:', error);
    }
}

export const privateData = async () => {
    try {
        const { data } = await authenticatedRequest.get(accountApiUrl + 'PrivateData');
        return data;
    } catch (error) {
      console.error('Error fetching Private API status:', error);
    }
}
