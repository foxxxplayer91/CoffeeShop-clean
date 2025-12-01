// -------------------- Add item to cart --------------------
function addToCart(name, productIndex) {
  var productDiv = document.getElementsByClassName("products")[productIndex];

  // 1️⃣ Base price per item
  var basePrice = 2.75; // default
  var sizeSelects = productDiv.getElementsByTagName("select");
  var size = "medium";
  if (sizeSelects.length > 0) {
    size = sizeSelects[0].value;
  }

  if (name === "Coffee" || name === "Hot Chocolate") {
    if (size === "small") basePrice = 2.0;
    else if (size === "medium") basePrice = 2.75;
    else if (size === "large") basePrice = 3.5;
  } else if (name === "Tea") {
    if (size === "small") basePrice = 1.75;
    else if (size === "medium") basePrice = 2.25;
    else if (size === "large") basePrice = 2.75;
  } else if (name === "Croissants") basePrice = 2.65;
  else if (name === "Bagels") basePrice = 2.5;
  else if (name === "Slice of Pie") basePrice = 3.25;

  // 2️⃣ Quantity
  var quantityInput = productDiv.querySelector('input[type="number"]');
  var quantity = 1; // default
  if (quantityInput) {
    var q = parseInt(quantityInput.value);
    if (!isNaN(q) && q > 0) {
      quantity = q;
    }
  }

  // 3️⃣ Extras & options string
  var options = "";
  for (var i = 0; i < sizeSelects.length; i++) {
    options += sizeSelects[i].name + ":" + sizeSelects[i].value + ",";
  }

  var checkboxes = productDiv.getElementsByTagName("input");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].type === "checkbox") {
      var cbName = checkboxes[i].name;
      if (cbName) {
        options += cbName + ":" + (checkboxes[i].checked ? "Yes" : "No") + ",";
        if (checkboxes[i].checked) {
          if (cbName === "whipped-cream") basePrice += 0.5;
          if (cbName === "marshmallows") basePrice += 0.5;
          if (cbName === "creamcheese") basePrice += 0.5;
          if (cbName === "herbgarlic") basePrice += 0.5;
        }
      }
    }
  }

  // Total price for this line
  var totalPrice = basePrice * quantity;

  // Build cart line
  var itemLine =
    name + "," + totalPrice.toFixed(2) + "," + quantity + "," + options;

  // Add to localStorage cart
  var cart = localStorage.getItem("cart");
  if (cart) {
    cart = cart + "\n" + itemLine;
  } else {
    cart = itemLine;
  }

  localStorage.setItem("cart", cart);

  // Update grand total
  updateGrandTotal();

  alert(quantity + " x " + name + " added to cart!");
}

// -------------------- Update Grand Total --------------------
function updateGrandTotal() {
  var cart = localStorage.getItem("cart");
  var total = 0;

  if (cart) {
    var lines = cart.split("\n");
    for (var i = 0; i < lines.length; i++) {
      var parts = lines[i].split(",");
      var lineTotal = parseFloat(parts[1]);
      if (!isNaN(lineTotal)) {
        total += lineTotal;
      }
    }
  }

  // Save grand total for checkout page
  localStorage.setItem("cartTotal", total.toFixed(2));

  // Update cart page display
  var summaryDiv = document.querySelector(".customer-summary");
  if (summaryDiv) {
    summaryDiv.innerHTML = "Balance Due: $" + total.toFixed(2);
  }
}

// -------------------- Attach buttons dynamically --------------------
window.onload = function () {
  var buttons = document.getElementsByClassName("add-cart");
  for (var i = 0; i < buttons.length; i++) {
    (function (i) {
      var productDiv = document.getElementsByClassName("products")[i];
      var name = productDiv.getElementsByTagName("h3")[0].innerHTML;

      buttons[i].onclick = function () {
        addToCart(name, i);
      };
    })(i);
  }

  // Show grand total on page load if cart exists
  updateGrandTotal();
};
