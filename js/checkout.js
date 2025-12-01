// -------------------- Display Balance Due --------------------
var balanceDiv = document.querySelector(".js-balance");
var balance = localStorage.getItem("cartTotal");
if (balance) {
  balanceDiv.textContent = parseFloat(balance).toFixed(2);
} else {
  balanceDiv.textContent = "0.00";
}

// -------------------- Pay at Store Checkbox --------------------
var payStoreCheckbox = document.querySelector('input[name="pay-store"]');
if (payStoreCheckbox) {
  payStoreCheckbox.onclick = function () {
    if (payStoreCheckbox.checked) {
      alert("You selected: Pay at Store");
    }
  };
}

// -------------------- Customer Request Textarea --------------------
var requestTextarea = document.getElementById("request");

// Save request to localStorage when text changes
if (requestTextarea) {
  requestTextarea.onchange = function () {
    localStorage.setItem("customerRequest", requestTextarea.value);
  };
}

// -------------------- Pay Now Form --------------------
var paymentForm = document.querySelector(".payment-form");

if (paymentForm) {
  paymentForm.onsubmit = function () {
    // Optional: Save customer info locally
    var name = document.getElementById("custCardName").value;
    var cardNumber = document.getElementById("custCardNumber").value;
    var expiry = document.getElementById("custExpiryDate").value;
    var cvv = document.getElementById("custCVV").value;
    var postal = document.getElementById("custCardPostal").value;

    localStorage.setItem("customerName", name);
    localStorage.setItem("customerCardNumber", cardNumber);
    localStorage.setItem("customerExpiry", expiry);
    localStorage.setItem("customerCVV", cvv);
    localStorage.setItem("customerPostal", postal);

    alert("Payment submitted! Thank you for your order.");

    // Clear cart after checkout
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTotal");

    return true; // allows form submission
  };
}

// -------------------- Optional: Display previous request if exists --------------------
var savedRequest = localStorage.getItem("customerRequest");
if (savedRequest && requestTextarea) {
  requestTextarea.value = savedRequest;
}
