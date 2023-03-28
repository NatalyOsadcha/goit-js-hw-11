import './css/styles.css';
import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
import axios from 'axios';

import { fetchPhoto } from './API';

const searchForm = document.querySelector('#search-form');
const searchQuery = searchForm.querySelector('input');
const galleryList = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

let searchPhotos = '';

searchForm.addEventListener('input', debounce(onInput, 700));
searchForm.addEventListener('submit', onSubmit);

function onInput() {
  searchPhotos = searchQuery.value.trim();
  console.log(searchPhotos);
}

function onSubmit(event) {
  event.preventDefault();
  fetchPhoto(searchPhotos).then(photos => {
    renderPhoto(photos);
    return photos;
  });
}

function renderPhoto(photos) {
  const markup = photos.map(
      ({ webformatURL, largeImageURL, likes, views, comments, downloads }) => {
        return `<li><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div></li>`;
      }
    )
      .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);
}

