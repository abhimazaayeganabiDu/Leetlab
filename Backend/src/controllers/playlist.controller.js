import { db } from "../libs/db";
import { AsyncHandler } from "../utils/api-async-handler";
import { ApiError } from "../utils/api-error-handle";




const getAllListDetails = AsyncHandler(async (req, res) => {

})

const getPlayListDetails = AsyncHandler(async (req, res) => {

})

const createPlaylist = AsyncHandler(async (req, res) => {
    const {name, description} = req.body

    if(!(name && description)) {
        throw new ApiError(400, "Please provide all the required fields")
    }

    const playlist = await db.playlist.create({
        
    })

})

const addProblemToPlaylist = AsyncHandler(async (req, res) => {

})

const deletePlaylist = AsyncHandler(async (req, res) => {

})

const removeProblemFromPlaylist = AsyncHandler(async (req, res) => {

})


export {
    getAllListDetails,
    getPlayListDetails,
    createPlaylist,
    addProblemToPlaylist,
    deletePlaylist,
    removeProblemFromPlaylist
}