import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("user");
  window.location.reload();
  return redirect("/");
}
