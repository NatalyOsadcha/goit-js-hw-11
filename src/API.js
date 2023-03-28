import axios from 'axios';
export { fetchPhoto };

const API_KEY = '34787804-1aefa27f7d66275b11fe28ff3';
const BASE_URL = 'https://pixabay.com/api/';

function fetchPhoto(search) {
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
