import express from "express";

const app = express();  // Create an instance of the Express application

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;