import express from "express";
import fs from "fs/promises";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.get("/artists", async (request, response) => {
  const data = await fs.readFile("./artists.json");
  const artists = JSON.parse(data);
  response.json(artists);
});

app.post("/artists", async (request, response) => {
  const newArtist = request.body;
  newArtist.id = uuidv4();
  console.log(newArtist);

  const data = await fs.readFile("./artists.json");
  const artists = JSON.parse(data);
  artists.push(newArtist);
  console.log(artists);
  fs.writeFile("./artists.json", JSON.stringify(artists));
  response.json(artists);
});

app.listen(port, () => {
  console.log("server started on 3333");
});

app.put("/artists/:id", async (request, response) => {
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
  artistToUpdate.website = body.shortDescription;
  fs.writeFile("./artists.json", JSON.stringify(artists));
  response.json(artists);
});
