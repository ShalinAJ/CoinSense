import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("user");
  localStorage.removeItem("account");
  window.location.reload();
  return redirect("/");
}
