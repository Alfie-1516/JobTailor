import summarizeJob from "../api/AI_endpoints/summarizeJob.js";

export const summarizeJobHandler = async (req, res) => {
  try {
    res.status(200).json(await summarizeJob(req.body.jobDescription));
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to summarize job description: " + error.message });
  }
};
