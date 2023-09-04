"use strict";
import { getArtists, createArtist, updateArtist, deleteArtist } from "./restservice.js";

window.addEventListener("load", initApp);
let artists;
export let selectedArtist;
let favoriteList = [];
let view = "home";

async function initApp() {
  artists = await getArtists();
  showArtists(artists);
  document.querySelector("#create-btn").addEventListener("click", createArtistClicked);
  document.querySelector("#select-sort-by").addEventListener("change", chooseSort);
  document.querySelector("#search").addEventListener("keyup", (event) => search(event.target.value));
  document.querySelector("#home").addEventListener("click", goHome);
  document.querySelector("#favorites").addEventListener("click", goToLikes);
}

export function showArtists(artists) {
  document.querySelector("#grid").innerHTML = "";
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
<button class="heart">🖤</button>
<button class="update-btn">UPDATE</button>
<button class="delete-btn">DELETE</button>

</article>    
    `
    );
    const heartButton = document.querySelector("article:last-child .heart");
    if (favoriteList.find((a) => a.id === artist.id)) {
      console.log(true);
      heartButton.classList.add("liked");
    } else {
      console.log(false);
    }

    document.querySelector("article:last-child .update-btn").addEventListener("click", () => updateArtistClicked(artist));
    document.querySelector("article:last-child .delete-btn").addEventListener("click", () => deleteArtistClicked(artist.id));
    document.querySelector("article:last-child .heart").addEventListener("click", () => favoriteArtists(artist, heartButton));
  }
  document.querySelector("#create-cancel-btn").addEventListener("click", closeDialog);
  document.querySelector("#cancel-btn-update").addEventListener("click", closeDialog);
  document.querySelector("#btn-cancel-delete").addEventListener("click", closeDialog);
  document.querySelector("keydown", (event) => {
    if (event.key === "Escape") {
      closeDialog();
    }
  });
}

export function updateGrid() {
  switch (view) {
    case "home":
      showArtists(artists);
      console.log(favoriteList);
      break;

    case "favorites":
      showArtists(favoriteList);
      break;
  }
}

function goHome() {
  document.querySelector("#grid").innerHTML = "";
  view = "home";
  updateGrid();
}

function goToLikes() {
  document.querySelector("#grid").innerHTML = "";
  view = "favorites";
  updateGrid();
}

function createArtistClicked() {
  document.querySelector("#create-dialog").showModal();
  document.querySelector("#create-form").addEventListener("submit", createArtist);
}

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

function deleteArtistClicked(id) {
  document.querySelector("#delete-dialog").showModal();
  document.querySelector("#btn-confirm-delete").addEventListener("click", () => deleteArtist(id));
}

function closeDialog() {
  document.querySelector("#create-dialog").close();
  document.querySelector("#update-dialog").close();
  document.querySelector("#delete-dialog").close();
}

async function chooseSort() {
  artists = await getArtists();
  let sortValue = document.querySelector("#select-sort-by").value;
  switch (sortValue) {
    case "name":
      console.log(sortValue);
      artists.sort(sortbyName);
      console.log(artists);
      favoriteList.sort(sortbyName);
      updateGrid();
      break;
    case "active":
      console.log(sortValue);
      artists.sort(sortbyActive);
      console.log(artists);
      favoriteList.sort(sortbyActive);
      updateGrid();
      break;
  }
}

function sortbyName(a, b) {
  return a.name.localeCompare(b.name);
}

function sortbyActive(a, b) {
  return a.activeSince - b.activeSince;
}

function search(searchValue) {
  console.log(searchValue);
  let searchArtist = artists.filter((artist) => artist.name.toLowerCase().includes(searchValue.toLowerCase()));
  showArtists(searchArtist);
}

function favoriteArtists(artist, heartButton) {
  if (favoriteList.includes(artist)) {
    const position = favoriteList.indexOf(artist);
    favoriteList.splice(position, 1);
    console.log(favoriteList);
    heartButton.classList.remove("liked");
  } else {
    favoriteList.push(artist);
    heartButton.classList.add("liked");
  }
  console.log(favoriteList);
}

export { artists };
