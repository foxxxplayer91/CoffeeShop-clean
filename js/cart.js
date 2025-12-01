/* -------------------- Add item to cart -------------------- */
window.onload = function () {
  var buttons = document.getElementsByClassName("add-cart");
  for (var i = 0; i < buttons.length; i++) {
    (function (i) {
      var productDiv = document.getElementsByClassName("products")[i];
      var name = productDiv.getElementsByTagName("h3")[0].innerHTML;

      buttons[i].addEventListener("click", function () {
        addToCart(name, i);
      });
    })(i);
  }

  displayCartItems();
};

/* -------------------- Add item to cart function -------------------- */
function addToCart(name, index) {
  var productDiv = document.getElementsByClassName("products")[index];

  var basePrice = 0;
  var selects = productDiv.getElementsByTagName("select");
  var size = "medium";
  if (selects.length > 0) size = selects[selects.length - 1].value;

  if (name === "Coffee" || name === "Hot Chocolate" || name === "Tea") {
    if (size === "small") basePrice = 2.0;
    else if (size === "medium") basePrice = 2.75;
    else if (size === "large") basePrice = 3.5;
  } else if (name === "Croissants") basePrice = 2.65;
  else if (name === "Bagels") basePrice = 2.5;
  else if (name === "Slice of Pie") basePrice = 3.25;

  var quantityInput = productDiv.getElementsByTagName("input");
  var quantity = 1;
  for (var i = 0; i < quantityInput.length; i++) {
    if (quantityInput[i].type === "number") {
      var q = parseInt(quantityInput[i].value);
      if (!isNaN(q) && q > 0) quantity = q;
      break;
    }
  }

  /* ------- Calculate extras for price ------- */
  for (var i = 0; i < quantityInput.length; i++) {
    if (quantityInput[i].type === "checkbox" && quantityInput[i].checked) {
      if (quantityInput[i].name === "whipped-cream") basePrice += 0.5;
      if (quantityInput[i].name === "marshmallows") basePrice += 0.5;
      if (quantityInput[i].name === "creamcheese") basePrice += 0.5;
      if (quantityInput[i].name === "herbgarlic") basePrice += 0.5;
    }
  }

  var totalPrice = basePrice * quantity;

  /* ----- Build options string (all inputs preserved) ------ */
  var options = "";
  for (var i = 0; i < selects.length; i++) {
    options += selects[i].name + ":" + selects[i].value + ",";
  }
  for (var i = 0; i < quantityInput.length; i++) {
    if (quantityInput[i].type === "checkbox") {
      options +=
        quantityInput[i].name +
        ":" +
        (quantityInput[i].checked ? "Yes" : "No") +
        ",";
    } else if (quantityInput[i].type === "number") {
      options += quantityInput[i].name + ":" + quantityInput[i].value + ",";
    }
  }

  /* ---- Build cart line ---- */
  var line =
    name + "," + totalPrice.toFixed(2) + "," + quantity + "," + options;

  /* ----- Save to localStorage ------ */
  var cart = localStorage.getItem("cart");
  if (cart && cart !== "") cart = cart + "\n" + line;
  else cart = line;
  localStorage.setItem("cart", cart);

  alert(quantity + " x " + name + " added to cart!");

  /* ------ Refresh cart display ------ */
  displayCartItems();
}

/* -------------------- Display cart items -------------------- */
function displayCartItems() {
  var cartDiv = document.getElementsByClassName("customer-items")[0];
  var summaryDiv = document.getElementsByClassName("customer-summary")[0];
  var cart = localStorage.getItem("cart");

  cartDiv.innerHTML = "";
  summaryDiv.innerHTML = "";

  if (!cart || cart === "") {
    cartDiv.innerHTML = "Your cart is empty.";
    return;
  }

  var lines = cart.split("\n");
  var grandTotal = 0;

  for (var i = 0; i < lines.length; i++) {
    var parts = lines[i].split(",");
    var name = parts[0];
    var price = parseFloat(parts[1]);
    var quantity = parts[2];
    var options = parts.slice(3).join(","); // Preserve all options

    /* ------ Display each item------ */
    cartDiv.innerHTML +=
      name + " (" + quantity + ") - $" + price.toFixed(2) + "<br />";
    cartDiv.innerHTML += "Options: " + options + "<br />";

    /* ------ Remove button ------ */
    cartDiv.innerHTML +=
      "<button class='remove-btn' data-index='" +
      i +
      "'>Remove</button><br /><br />";

    grandTotal += price;
  }

  summaryDiv.innerHTML = "Balance Due: $" + grandTotal.toFixed(2);

  /* ------ Update grand total after removing an item ------ */
  localStorage.setItem("grandTotal", grandTotal.toFixed(2));

  /* ------ Attach remove button handlers ------ */
  var removeButtons = document.getElementsByClassName("remove-btn");
  for (var j = 0; j < removeButtons.length; j++) {
    removeButtons[j].onclick = function () {
      var idx = parseInt(this.getAttribute("data-index"));
      removeCartItem(idx);
    };
  }
}

/* -------------------- Remove item from cart -------------------- */
function removeCartItem(index) {
  var cart = localStorage.getItem("cart");
  if (!cart) return;

  var lines = cart.split("\n");
  var newCart = "";
  for (var i = 0; i < lines.length; i++) {
    if (i !== index) {
      if (newCart === "") newCart = lines[i];
      else newCart += "\n" + lines[i];
    }
  }
  localStorage.setItem("cart", newCart);

  /* ------ Refresh cart display ------ */
  displayCartItems();

  /* ---- Update grand total in localStorage ---- */
  if (newCart === "") {
    localStorage.removeItem("grandTotal"); // cart is empty, reset
  } else {
    var total = 0;
    var items = newCart.split("\n");
    for (var j = 0; j < items.length; j++) {
      var parts = items[j].split(",");
      total += parseFloat(parts[1]);
    }
    localStorage.setItem("grandTotal", total.toFixed(2));
  }
}
