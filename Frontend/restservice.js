"use strict";
import { artists, selectedArtist, updateGrid } from "./main.js";
const endpoint = "http://localhost:4333";

// funktion der henter listen med alle artister
export async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}

// create form til oprettelse af artist
export async function createArtist(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.newName.value;
  const activeSince = form.newActive.value;
  const birthdate = form.newBirthdate.value;
  const genres = form.newGenre.value;
  const labels = form.newLabel.value;
  const image = form.newImg.value;
  const website = form.newURL.value;
  const shortDescription = form.newDiscription.value;

  const newArtist = { name, activeSince, birthdate, genres, labels, image, website, shortDescription };
  console.log(newArtist);
  const artistJson = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistJson,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    updateGrid();
    alert("NEW ARTIST CREATED!");
  }
}

// form til opdatering af oplysninger om artist
export async function updateArtist(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.updatedName.value;
  const birthdate = form.updBirthdate.value;
  const activeSince = form.updatedActive.value;
  const genres = form.updatedGenre.value;
  const labels = form.updatedLabel.value;
  const image = form.updatedImg.value;
  const website = form.updatedURL.value;
  const shortDescription = form.updatedDiscription.value;

  const updatedArtist = { name, birthdate, activeSince, genres, labels, image, website, shortDescription };
  console.log(updateArtist);
  const upArtistJson = JSON.stringify(updatedArtist);
  const response = await fetch(`${endpoint}/artists/${selectedArtist.id}`, {
    method: "PUT",
    body: upArtistJson,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    updateGrid();
    alert("ARTIST UPDATED!");
  }
}

// sletning af artist og opdatering af listen der vises.
export async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    artists = await getArtists(`${endpoint}/artists`);
    updateGrid();
  }
}
