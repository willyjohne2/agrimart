// Dynamically include header and footer from external HTML files
function includeHTML(selector, url) {
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = data;
                
                // Dispatch event to notify other scripts that content is ready
                document.dispatchEvent(new CustomEvent('contentLoaded', {
                    detail: { selector, url }
                }));
            }
        })
        .catch(err => console.error(`Error loading ${url}:`, err));
}

document.addEventListener("DOMContentLoaded", function () {
    // Use root-relative paths for Vercel compatibility
    includeHTML("header", "/includes/header2.html");
    includeHTML("footer", "/includes/footer.html");
});
