/* ------------------ Sign Out the User --------------- */

function signOutUser() {
  /* ----- Remove only signed-in status and cart info ----- */
  localStorage.removeItem("signedIn");
  localStorage.removeItem("cart");
  localStorage.removeItem("grandTotal"); // reset balance

  /* ------- Redirect to Home page --------- */
  window.location.href = "index.html";
}
