import { redirect } from "react-router-dom";

export function action() {
<<<<<<< HEAD
  localStorage.removeItem("user");
=======
  localStorage.removeItem("token");
>>>>>>> 14f860607aac25e62648263ba590b8576d837ff5
  return redirect("/");
}
