import { AsyncHandler } from "../utils/api-async-handler.js";
import { db } from "../libs/db.js";


const createProblem = AsyncHandler(async (req, res) => {
    const {title, description, difficulty, tags, example, constraints, testcases, codeSnippet, referenceSolution} = req.body

    for(const[language, solutionCode] of Object.entries(referenceSolution)) {

    }
})


export {
    createProblem
}