import { supabase } from "../supabase";
import { useAuth } from "../auth/AuthProvider";

function GetUserName() {
  const { user } = useAuth();
  async function getUserName() {
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user?.id);
    return data;
  }
}
