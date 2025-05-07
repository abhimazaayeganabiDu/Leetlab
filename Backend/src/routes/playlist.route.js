import express from "express"
import { checkLogin } from "../middleware/login.middleware.js"


const app = express.Router()

app.use(checkLogin)

app.get("/", getAllListDetails);
app.get("/:playlistId", getPlayListDetails);
app.post("/create-playlist", createPlaylist);
app.post("/:playlistId/add-problem", addProblemToPlaylist);
app.delete("/:playlistId", deletePlaylist);
app.delete("/:playlistId/remove-problem", removeProblemFromPlaylist)


export default app;