function attachCounterListeners() {
    let inp = document.querySelector("textarea");
    let span = document.querySelector("span");
    let space = document.querySelector(".space");
    let number = document.querySelector(".number");
    let word = document.querySelector(".word-counter");

    if (!inp) return; // If textarea doesn't exist, exit

    inp.addEventListener("input", () => {
        span.textContent = inp.value.length;
        space.textContent = (inp.value.match(/\s/g) || []).length;
        number.textContent = (inp.value.match(/[0-9]/g) || []).length;
        if (word) word.textContent = (inp.value.match(/\b\w+\b/g) || []).length;
    });
}

// Initial attach
attachCounterListeners();

// SPA navigation
document.querySelectorAll('.spa-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        fetch(url)
            .then(response => response.text())
            .then(html => {
                // Extract the content inside <div class="container">...</div>
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.querySelector('.container');
                document.querySelector('.container').innerHTML = newContent.innerHTML;
                // Optionally update the active link
                document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                // Update the URL in the browser without reloading
                window.history.pushState({}, '', url);
                // Re-attach event listeners
                attachCounterListeners();
            });
    });
});

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    fetch(location.pathname)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('.container');
            document.querySelector('.container').innerHTML = newContent.innerHTML;
            // Re-attach event listeners
            attachCounterListeners();
        });
});
