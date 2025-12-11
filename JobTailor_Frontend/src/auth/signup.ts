import { routes } from "@/constants/routes";
import { supabase } from "@/lib/supabaseClient";

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function signup(userData: SignupData) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          display_name: `${userData.firstName} ${userData.lastName}`,
        },
      },
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error("User creation failed");
    }


  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}

export async function signupWithGoogle() {
  try {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${routes.dashboard}`,
      }
    });

   
  } catch (error) {
    console.error("Error signing up with Google:", error);
    throw error;
  }
}
