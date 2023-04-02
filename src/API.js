import axios from 'axios';
export { fetchPhoto };

const API_KEY = '34787804-1aefa27f7d66275b11fe28ff3';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchPhoto(search, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    return await response.data;
  } catch (e) {
    console.error(e);
  }
}
