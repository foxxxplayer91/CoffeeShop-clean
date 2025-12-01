/* ----- Get current hour now = new Date(); ----- */

const currentHour = now.getHours(); // 0-23

/* ---- Select the marquee element ----- */

const marquee = document.getElementById("coffee-discount");

if (marquee) {
  /* ------ Only run if the element exists, show discount after 2 PM-------- */

  if (currentHour >= 14) {
    marquee.innerHTML = "☕ Special Offer: $1 off each coffee cup after 2PM!";
  } else {
    marquee.innerHTML = ""; // No discount before 2 PM
  }
}
