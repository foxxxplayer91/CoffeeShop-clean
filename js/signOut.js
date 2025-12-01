/* ------------------ Sign Out the User --------------- */
function signOutUser() {
  /* ----- Remove all stored account and cart info ----- */
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("email");
  localStorage.removeItem("phone");
  localStorage.removeItem("address");
  localStorage.removeItem("password");

  localStorage.removeItem("cart");

  localStorage.removeItem("isSignedIn");

  /* ------- Redirect to Home page --------- */
  window.location.href = "index.html";
}
