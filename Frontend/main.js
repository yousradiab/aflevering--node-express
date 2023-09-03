"use strict";
import { getArtists, createArtist, updateArtist } from "./restservice.js";

window.addEventListener("load", initApp);
let artists;
export let selectedArtist;

async function initApp() {
  artists = await getArtists();
  showArtists(artists);
  document.querySelector("#create-btn").addEventListener("click", createArtistClicked);
}

export function showArtists(artists) {
  for (const artist of artists) {
    document.querySelector("#grid").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `
<article class= artist-grid>
<h2>${artist.name}</h2>
<img src="${artist.image}">
<p>Birthdate:${artist.birthdate}</p>
<p>Active since:${artist.activeSince}</p>
<p>genre:${artist.genres}</p>
<p>label:${artist.labels}</p>
<p>website:${artist.website}</p>
<p>${artist.shortDescription}</p>
<button>🖤</button>
<button class="update-btn">UPDATE</button>
<button class="delete-btn">DELETE</button>

</article>    
    `
    );
    document.querySelector("article:last-child .update-btn").addEventListener("click", () => updateArtistClicked(artist));
  }
}

function createArtistClicked() {
  document.querySelector("#create-dialog").showModal();
  document.querySelector("#create-form").addEventListener("submit", createArtist);
}

export { artists };

function updateArtistClicked(artist) {
  document.querySelector("#update-dialog").showModal();
  selectedArtist = artist;
  document.querySelector("#updatedName").value = artist.name;
  document.querySelector("#updatedActive").value = artist.activeSince;
  document.querySelector("#updatedGenre").value = artist.genres;
  document.querySelector("#updatedLabel").value = artist.labels;
  document.querySelector("#updBirthdate").value = artist.birthdate;
  document.querySelector("#updatedDiscription").value = artist.shortDescription;
  document.querySelector("#updatedURL").value = artist.website;
  document.querySelector("#updatedImg").value = artist.image;
  document.querySelector("#update-form").addEventListener("submit", updateArtist);
}
