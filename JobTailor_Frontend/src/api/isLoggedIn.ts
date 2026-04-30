import { supabase } from "@/lib/supabaseClient";

export type LoggedInUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type IsLoggedInResult = {
  isLoggedIn: boolean;
  user: LoggedInUser | null;
};

const isLoggedIn = async (): Promise<IsLoggedInResult> => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return { isLoggedIn: false, user: null };
  }

  const { user } = data.session;
  const metadata = user?.user_metadata ?? {};

  return {
    isLoggedIn: true,
    user: {
      id: user!.id,
      email: user!.email ?? "",
      firstName: metadata.first_name ?? "",
      lastName: metadata.last_name ?? "",
    },
  };
};

export default isLoggedIn;
