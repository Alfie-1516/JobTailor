import { addCertification, getCertifications, updateCertification, deleteCertification } from "../api/certifications_endpoints/certification_CRUD.js";
import { tokenValidator } from "../components/tokenValidator.js";

//Add certification
export const addCertificationHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await addCertification(req.body.certification, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to add certification: " + error.message });
  }
};

//Get certifications
export const getCertificationsHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await getCertifications(user));
  } catch (error) {
    res.status(500).json({ error: "Failed to get certifications: " + error.message });
  }
};

//Update certification
export const updateCertificationHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateCertification(req.body.certification, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update certification: " + error.message });
  }
};

//Delete certification
export const deleteCertificationHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await deleteCertification(req.body.certification, user));
  } catch (error) {
    res.status(500).json({ error: "Failed to delete certification: " + error.message });
  }
};