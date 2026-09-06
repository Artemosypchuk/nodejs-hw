import "dotenv/config";
import express from "express";
import cors from "cors";
import pino from "pino-http";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  pino({
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
        messageFormat:
          "{req.method} {req.url} {res.statusCode} - {responseTime}ms",
        hideObject: true,
      },
    },
  }),
);

app.use(cors());
app.use(express.json());

app.get("/notes", (req, res) => {
  res.status(200).json({ message: "Retrieved all notes" });
});

app.get("/notes/:noteId", (req, res) => {
  res
    .status(200)
    .json({ message: `Retrieved note with ID: ${req.params.noteId}` });
});

app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "development";

  res.status(500).json({
    message: err.message || "Internal Server Error",
    ...(isDev && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
