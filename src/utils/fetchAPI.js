import axios from 'axios';
import { IMAGES_PER_PAGE } from './constants';
const PARAMS = {
  key: '31327599-116df7529d1e96ddae5bcbe74',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: IMAGES_PER_PAGE,
};
const fetchPixabay = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

async function fetchPictures(q, page) {
  const { data } = await fetchPixabay.get('', {
    params: { ...PARAMS, q, page },
  });
  return data;
}

export default fetchPictures;
