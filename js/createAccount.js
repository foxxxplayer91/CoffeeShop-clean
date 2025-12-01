/* --------------- Clicks "Create New Account" BUTTON. ----------- */

function createNewAccount() {
  /* --------- Values from create account form ----------*/

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("create-email").value;
  const password = document.getElementById("create-password").value;
  const dob = document.getElementById("dob").value;
  const preferredName = document.getElementById("pref-name").value;
  const phone = document.getElementById("phone").value;

  /* ---- Make sure all fields are entered in by user ---- */

  if (!firstName || !lastName || !email || !password) {
    alert("Please fill in all required fields.");
  }

  /* ---- Store each field from form in localStorage ----*/

  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
  localStorage.setItem("dob", dob);
  localStorage.setItem("preferredName", preferredName);
  localStorage.setItem("phone", phone);

  localStorage.setItem("signedIn", "true");

  /* Jump to My Account Page after creating new account */
  window.location.href = "account.html";
}
