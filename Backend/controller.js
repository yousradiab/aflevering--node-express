import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function getAllArtists(request, response) {
  const data = await fs.readFile("./artists.json");
  const artists = JSON.parse(data);
  response.json(artists);
}

export async function getOneArtist(request, response) {
  async (request, response) => {
    const id = request.params.id;
    const data = await fs.readFile("./artists.json");
    const artists = JSON.parse(data);
    const result = artists.find((artist) => artist.id === id);
    console.log(result);

    if (!result) {
      response.status(404).json({ error: "Artist not found" });
    } else {
      response.json(result);
    }
  };
}

export async function createAnArtist(request, response) {
  const newArtist = request.body;
  newArtist.id = uuidv4();
  console.log(newArtist);

  const data = await fs.readFile("./artists.json");
  const artists = JSON.parse(data);
  artists.push(newArtist);
  console.log(artists);
  fs.writeFile("./artists.json", JSON.stringify(artists));
  response.json(artists);
}

export async function updateAnArtist(request, response) {
  const id = request.params.id;
  console.log(id);

  const data = await fs.readFile("./artists.json");
  const artists = JSON.parse(data);
  let artistToUpdate = artists.find((artist) => artist.id === id);
  const body = request.body;
  artistToUpdate.name = body.name;
  artistToUpdate.image = body.image;
  artistToUpdate.birthdate = body.birthdate;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.genres = body.genres;
  artistToUpdate.labels = body.labels;
  artistToUpdate.website = body.website;
  artistToUpdate.shortDescription = body.shortDescription;
  fs.writeFile("./artists.json", JSON.stringify(artists));
  response.json(artists);
}

export async function deleteAnArtist(request, response) {
  const id = request.params.id;
  const data = await fs.readFile("./artists.json");
  const artists = JSON.parse(data);

  let artistToDelete = artists.find((artist) => artist.id === id);
  if (!artistToDelete) {
    return;
  }
  let postionOfArtist = artists.indexOf(artistToDelete);

  artists.splice(postionOfArtist, 1);
  fs.writeFile("./artists.json", JSON.stringify(artists));
  response.json(artists);
}
