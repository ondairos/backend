import express, { Request, Response } from "express";
import bodyParser from "body-parser";
// @ts-expect-error cors
import cors from "cors";

import { housesData } from "./rawData";

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.get("/houses", (req: Request, res: Response) => {
  if (!housesData) {
    res.json({ error: "Houses not found!" });
  }
  const name = req.query.name as string;

  if (name) {
    const house = housesData.find(
      (foundHouse) => foundHouse.name.toLowerCase() === name.toLowerCase()
    );
    res.json(house);
  } else {
    res.json(housesData);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
