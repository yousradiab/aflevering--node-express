"use strict";
import { artists, selectedArtist, updateGrid } from "./main.js";
const endpoint = "http://localhost:3333";

export async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}

export async function createArtist(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.newName.value;
  const activeSince = form.newActive.value;
  const newBirthdate = form.newBirthdate.value;
  const genre = form.newGenre.value;
  const label = form.newLabel.value;
  const image = form.newImg.value;
  const website = form.newURL.value;
  const description = form.newDiscription.value;

  const newArtist = { name, activeSince, newBirthdate, genre, label, image, website, description };
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

export async function updateArtist(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.updatedName.value;
  const birhdate = form.updBirthdate.value;
  const activeSince = form.updatedActive.value;
  const genre = form.updatedGenre.value;
  const label = form.updatedLabel.value;
  const image = form.updatedImg.value;
  const website = form.updatedURL.value;
  const description = form.updatedDiscription.value;

  const updatedArtist = { name, birhdate, activeSince, genre, label, image, website, description };
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

export async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    artists = await getArtists(`${endpoint}/artists`);
    updateGrid();
  }
}
