export async function summarizeJob(jobDescription) {
  try {
    const response = await fetch(`${HF_API}facebook/bart-large-cnn`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: jobDescription,
        parameters: {
          max_length: 200,
          min_length: 50,
        },
        options: {
          wait_for_model: true,
        },
      }),
    });

    const result = await response.json();

    res.json({
      success: true,
      data: {
        summary: result[0].summary_text,
      },
      model: "BART-large-CNN",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
