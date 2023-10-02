import express from "express";
import cors from "cors";
import pokemonRouter from "./routes/pokemonRouter.js";
const app = new express();
const PORT = 8000;
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/pokemon", pokemonRouter);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
