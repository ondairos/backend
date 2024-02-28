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
    // find a house by any chars contained in the name
    // ffi should return griffyndor
    // filter with the name param included in the house name
    // an array that we will push the results
    let housesFilteredArray = [];
    housesFilteredArray = housesData.filter((foundHouse) =>
      foundHouse.name.toLowerCase().includes(name.toLowerCase())
    );

    res.json(housesFilteredArray);
  } else {
    res.json(housesData);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
