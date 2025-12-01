/* ------------------ Redirect if not signed in ------------------ */
if (!localStorage.getItem("signedIn")) {
  alert("Please sign in to access this page.");
  window.location.href = "signIn.html";
}

/* ------------------ Populate My Account fields ------------------ */
document.getElementById("accountName").value =
  localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
document.getElementById("accountEmail").value = localStorage.getItem("email");
document.getElementById("accountDOB").value = localStorage.getItem("dob");
document.getElementById("accountPrefName").value =
  localStorage.getItem("preferredName");
document.getElementById("accountPhone").value = localStorage.getItem("phone");
