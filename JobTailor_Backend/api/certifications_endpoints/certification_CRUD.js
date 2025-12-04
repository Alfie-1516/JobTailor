import { supabase } from "../../supabaseClient.js";
import getUserIdFromAuthId from "../../components/getUserIdFromAuthId.js";

export async function addCertification(certification, user) {
  const userId = await getUserIdFromAuthId(user.id);
  certification.user_id = userId;
  const { data, error } = await supabase
    .from("tbl_certifications")
    .insert(certification);

  if (error) {
    throw new Error(`Failed to add certification: ${error.message}`);
  }

  return {
    message: "Certification added successfully",
    certification: data,
  };
}

export async function getCertifications(user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_certifications")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to get certifications: ${error.message}`);
    }

  return {
    message: "Certifications fetched successfully",
    certifications: data,
  };
}

export async function updateCertification(certification, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_certifications")
    .update(certification)
    .eq("user_id", userId)
    .eq("id", certification.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update certification: ${error.message}`);
  }

  return {
    message: "Certification updated successfully",
    certification: data,
  };
}

export async function deleteCertification(certification, user) {
  const userId = await getUserIdFromAuthId(user.id);
  const { data, error } = await supabase
    .from("tbl_certifications")
    .delete()
    .eq("user_id", userId)
    .eq("id", certification.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to delete certification: ${error.message}`);
  }

  return {
    message: "Certification deleted successfully",
    certification: data,
  };
}