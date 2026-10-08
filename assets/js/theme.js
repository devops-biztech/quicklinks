/* Runs before first paint: applies the saved theme (no white flash for dark-mode users) and marks
   that JavaScript is on, so the page can hold its content back until it's fully rendered. */
document.documentElement.classList.add("js");
try {
  var saved = JSON.parse(localStorage.getItem("ql:theme"));
  if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
} catch (e) {}
