if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/nexio/sw.js");
  });
}
if (!navigator.onLine) window.location.href = "/nexio/offline.html";
const url = window.location.href;

function getPath() {
  const path = window.location.pathname
    .replace(/^\/nexio\//, "")
    .replace(/\/$/, "");
  return path || "home";
}

// Update iframe with current path
function updateIframe() {
  let path = getPath();
  document.title = "Nexio App - " + cap(path);
  const iframe = document.querySelector("iframe");
  if (url.includes("?ssid=")) {
    path = url.split("nexio/")[1].split("?").join("&");
  }
  iframe.src = `https://script.google.com/macros/s/AKfycbxzTgJEEuZ0TPV-V7wYPbDKYMuKufa_le-DgMboGWKluB-iW1hIS5a4X89Rdl2tMwQA/exec?p=${path}`;
  iframe.addEventListener("load", function () {
    document.querySelector("#load").style.display = "none";
    iframe.style.display = "block";
  });
}
function cap(str) {
  if (!str) return ""; // Handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateIframe();
  window.addEventListener("popstate", updateIframe);
});

 window.addEventListener('message', (event) => {
      if (event.origin.startsWith("https://script.google.com")) {
        if (event.data.type === 'updateUrl') {
          history.pushState({}, '', event.data.url);
          console.log('URL updated to:', event.data.url);
        }
      }
    });
