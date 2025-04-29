import { AsyncHandler } from "../utils/api-async-handler.js";
import { db } from "../libs/db.js";
import { getJudge0LanguageId, pollBatchResult, submitBatch } from "../libs/judge0.lib.js";
import { ApiError } from "../utils/api-error-handle.js";
import { ApiReponse } from "../utils/api-response.js";

const createProblem = AsyncHandler(async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    example,
    constraints,
    testcases,
    codeSnippets,
    referenceSolution,
  } = req.body;

  for (const [language, solutionCode] of Object.entries(referenceSolution)) {
    const languageId = getJudge0LanguageId(language);

    if (!languageId) {
      throw new ApiError(400, `Language ${language} is not supported.`);
    }

    const submissions = testcases.map(({ input, output }) => ({
      source_code: solutionCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));

    const submissionResult = await submitBatch(submissions);

    const tokens = submissionResult.map((res) => res.token);
    
    const result = await pollBatchResult(tokens);
    
    for (let i = 0; i < result.length; i++) {
      console.log("Result________", result[i]);

      if (result[i].status.id != 3) {

        throw new ApiError(
          400,
          `Testcase ${i + 1} failed for language ${language} `
        );
      }
    }

    const newProblem = await db.problem.create({
      data: {
        userId: req.user.id,
        title,
        description,
        difficulty,
        tags,
        example,
        constraints,
        testcases,
        codeSnippets,
        referenceSolution,
      },
    });

    return res
      .status(201)
      .json(
        new ApiReponse(
          201,
          newProblem,
          "New problem created and tested sucessfully."
        )
      );
  }
});

export { createProblem };
