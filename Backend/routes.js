import express, { response } from "express";
import cors from "cors";
import { createAnArtist, getAllArtists, getOneArtist, updateAnArtist, deleteAnArtist } from "./controller.js";
const app = express();
const port = 4333;

app.use(express.json());
app.use(cors());

// hente liste af artister
app.get("/artists", getAllArtists);

//hente en enkel artist
app.get("/artists/:id", getOneArtist);

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
// poste en enkel artist med et unikt id
app.post("/artists", createAnArtist);

// opdatere artist
app.put("/artists/:id", updateAnArtist);

// slette en artist
app.delete("/artists/:id", deleteAnArtist);
