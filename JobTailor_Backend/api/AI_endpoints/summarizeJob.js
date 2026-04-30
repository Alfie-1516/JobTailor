import { ai_model } from "../../components/AI_Model.js";

export async function summarizeJob(jobDescription) {
  const result = await ai_model(
    `Summarize the following job description:\n\n${jobDescription}`,
  );

  return result;
}
export default summarizeJob;
