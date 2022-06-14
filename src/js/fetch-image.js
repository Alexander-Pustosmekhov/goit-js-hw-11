import axios from 'axios';
import { page } from '../index';

export async function fetchImages(nameImage) {
  const BASE_KEY = '26673038-cabd68481316a87c43ed4c613';
  const URL = 'https://pixabay.com/api/';
  const options = new URLSearchParams({
    key: BASE_KEY,
    q: nameImage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  });
  return await axios.get(`${URL}?${options}`);
}
