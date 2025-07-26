if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/nutri/sw.js');
    });
}
if(!navigator.onLine) window.location.href = '/nutri/offline.html';
const url = window.location.href;
    const quotes = [
        "Food is the ingredient that binds us together.",
        "Every meal is a chance to create a memory.",
        "Good food nourishes the body, great food feeds the soul.",
        "A kitchen filled with love cooks the tastiest meals.",
        "The secret ingredient? Always joy.",
        "Food is the universal language of kindness.",
        "One bite can transport you across the world.",
        "Food tastes better when shared with loved ones.",
        "A simple meal cooked with love is everything.",
        "Food is the quiet language of care."
    ];
    function rn() {
        return Math.floor(Math.random() * 10);
    }
    function getPath() {
        const path = window.location.pathname
            .replace(/^\/nutri\//, '')
            .replace(/\/$/, '');
        return path || 'home';
    }

    // Update iframe with current path
    function updateIframe() {
        let path = getPath();
        document.title = 'Nutri App - ' + cap(path);
        const iframe = document.querySelector('iframe');
        if (url.includes('?ssid=')) {
            path = url.split('nutri/')[1].split('?').join('&');
            console.log(url);
        }
        iframe.src = `https://script.google.com/macros/s/AKfycbx8HtlwLxfdnpK9bQi3OhiWgkVI446g2oyoawbZWMTRGjqveflPDm36fjYWJuhxRdCb/exec?p=${path}`;
        console.log(path);
        iframe.addEventListener('load', function() {
            document.querySelector('#load').style.display = 'none';
            iframe.style.display = 'block';
        });
    }
    function cap(str) {
      if (!str) return ""; // Handle empty string
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('#qoute').innerHTML = quotes[rn()];
        updateIframe();
        window.addEventListener('popstate', updateIframe);
    });