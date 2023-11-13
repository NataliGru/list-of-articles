import axios from 'axios';
import { RequestParameters } from '../types/requestParameters';

const API_KEY = 'e8c7b7ce9c674ae3a63e4ef456c681fd';
const COUNTRY = 'us';

const baseUrl = 'https://newsapi.org/v2/top-headlines';

export const fetchNewsData = async ({
    query,
    page,
    pageSize,
}: RequestParameters) => {
  const params: Record<string, string | number> = {
    country: COUNTRY,
    page: page,
    pageSize: pageSize,
    apiKey: API_KEY,
  };

  if (query) {
    params.q = query;
  }

  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');

  const url = `${baseUrl}?${queryString}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

