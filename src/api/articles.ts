import axios from 'axios';
import { RequestParameters } from '../types/requestParameters';

const API_KEY = '2e06e03a7f9743a185db7dd20c3482ff';
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

