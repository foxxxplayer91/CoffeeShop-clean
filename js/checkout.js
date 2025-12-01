/* -------------------- Display Balance Due -------------------- */

var balanceDiv = document.querySelector(".js-balance");
var balance = localStorage.getItem("grandTotal");
if (balance) {
  balanceDiv.textContent = parseFloat(balance).toFixed(2);
} else {
  balanceDiv.textContent = "0.00";
}

/* -------------------- Pay at Store Checkbox -------------------- */

var payStoreCheckbox = document.querySelector('input[name="pay-store"]');
if (payStoreCheckbox) {
  payStoreCheckbox.onclick = function () {
    if (payStoreCheckbox.checked) {
      alert("You selected: Pay at Store");
    }
  };
}

/* -------------------- Customer Request Textarea -------------------- */

var requestTextarea = document.getElementById("request");

/* ----- Save request to localStorage when text changes ------ */

if (requestTextarea) {
  requestTextarea.onchange = function () {
    localStorage.setItem("customerRequest", requestTextarea.value);
  };
}

/* -------------------- Pay Now Form -------------------- */

var paymentForm = document.querySelector(".payment-form");

if (paymentForm) {
  paymentForm.onsubmit = function () {
    alert("Payment submitted! Thank you for your order.");

    /* ----- Clear cart after checkout ------ */
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTotal");

    return true; // allows form submission
  };
}
