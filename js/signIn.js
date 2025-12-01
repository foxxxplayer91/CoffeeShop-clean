/* ------------------ Sign In Button ------------------ */
function signIn() {
  // Get user input
  var emailInput = document.getElementsByName("signIn-email")[0].value;
  var passwordInput = document.getElementsByName("signIn-password")[0].value;

  // Get stored account info
  var storedEmail = localStorage.getItem("email");
  var storedPassword = localStorage.getItem("password");

  // Check if input matches stored account
  if (emailInput === storedEmail && passwordInput === storedPassword) {
    // Sign in successful
    localStorage.setItem("signedIn", "true");
    alert("Welcome back, " + localStorage.getItem("firstName") + "!");
    window.location.href = "account.html";
  } else {
    alert("Incorrect email or password. Please try again.");
  }
}

/* ------------------ Sign Out Button ------------------ */
function signOutUser() {
  // Remove only the signed-in flag (keep account info)
  localStorage.removeItem("signedIn");
  window.location.href = "index.html";
}
