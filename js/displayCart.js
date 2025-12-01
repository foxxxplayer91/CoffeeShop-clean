window.onload = function () {
  displayCartItems();
  attachCheckoutHandler();
};

// Display cart items and total

function displayCartItems() {
  const cartDiv = document.querySelector(".customer-items");
  const summaryDiv = document.querySelector(".customer-summary");
  const cart = localStorage.getItem("cart");
  cartDiv.innerHTML = "";
  summaryDiv.innerHTML = "";

  if (!cart || cart.trim() === "") {
    cartDiv.innerHTML = "<p>Your cart is empty.</p>";
    localStorage.removeItem("grandTotal"); // Clear previous total
    return;
  }

  const items = cart.split("\n");
  let grandTotal = 0;

  items.forEach((line) => {
    const [name, totalPrice, quantity, options] = line.split(",");
    const itemElem = document.createElement("p");
    itemElem.textContent = `${name} (${quantity}) - $${parseFloat(
      totalPrice
    ).toFixed(2)}`;
    cartDiv.appendChild(itemElem);

    const optionsElem = document.createElement("p");
    optionsElem.style.fontSize = "0.9em";
    optionsElem.textContent = `Options: ${options}`;
    cartDiv.appendChild(optionsElem);

    grandTotal += parseFloat(totalPrice);
  });

  summaryDiv.innerHTML = `<p>Total: $${grandTotal.toFixed(2)}</p>`;
  localStorage.setItem("grandTotal", grandTotal.toFixed(2)); // store total for checkout
}

// Attach checkout button handler

function attachCheckoutHandler() {
  const checkoutBtn = document.querySelector("button[name='checkout-button']");
  checkoutBtn.addEventListener("click", () => {
    const cart = localStorage.getItem("cart");
    if (!cart || cart.trim() === "") {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }

    const forNow = document.querySelector("input[name='for-now']").checked;
    const forLater = document.querySelector("input[name='for-later']").checked;

    if (!forNow && !forLater) {
      alert("Please select a pickup option: Order for Now or Order for Later.");
      return;
    }

    if (forNow && forLater) {
      alert("Please select only one pickup option.");
      return;
    }

    // If "Order for Later", ask for desired time and validate
    if (forLater) {
      let userTime = prompt(
        "Enter desired pickup time (HH:MM, 24-hour format)"
      );
      if (!userTime) return;

      if (!isValidPickupTime(userTime)) {
        alert(
          "Selected time is outside of business hours. Please choose a valid time."
        );
        return;
      }

      localStorage.setItem("pickup-time", userTime);
    } else {
      localStorage.setItem("pickup-time", "Now");
    }

    localStorage.setItem("pickup-option", forNow ? "Now" : "Later");
    // Proceed to checkout page
    window.location.href = "checkout.html";
  });
}

// Business hours map
const businessHours = {
  0: { start: 7, end: 13 }, // Sunday
  1: { start: 5, end: 16 }, // Monday
  2: { start: 5, end: 16 }, // Tuesday
  3: { start: 5, end: 16 }, // Wednesday
  4: { start: 5, end: 16 }, // Thursday
  5: { start: 5, end: 16 }, // Friday
  6: { start: 6, end: 15 }, // Saturday
};

// Validate pickup time is within business hours
function isValidPickupTime(timeStr) {
  const [hourStr, minuteStr] = timeStr.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (
    isNaN(hour) ||
    isNaN(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return false;
  }

  const today = new Date();
  const day = today.getDay(); // 0 = Sunday, 6 = Saturday
  const hours = businessHours[day];

  const pickupTime = hour + minute / 60;
  return pickupTime >= hours.start && pickupTime <= hours.end;
}
