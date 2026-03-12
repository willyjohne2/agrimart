// Dynamically include header and footer from external HTML files
function includeHTML(selector, url) {
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = data;
                
                // Adjust links based on current page location
                const isSubPage = window.location.pathname.includes('/pages/');
                const links = element.querySelectorAll('a');
                links.forEach(link => {
                    let href = link.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#')) {
                        if (isSubPage) {
                            if (href === 'index.html') {
                                link.setAttribute('href', '../index.html');
                            } else if (!href.startsWith('pages/')) {
                                // Already in pages/, so About.html -> About.html
                                // but index.html was already handled.
                            }
                        } else {
                            // In root, so About.html -> pages/About.html
                            if (href !== 'index.html' && !href.startsWith('pages/')) {
                                link.setAttribute('href', 'pages/' + href);
                            }
                        }
                    }
                });

                // Dispatch event to notify other scripts that content is ready
                document.dispatchEvent(new CustomEvent('contentLoaded', {
                    detail: { selector, url }
                }));
            }
        })
        .catch(err => console.error(`Error loading ${url}:`, err));
}

document.addEventListener("DOMContentLoaded", function () {
    const isSubPage = window.location.pathname.includes('/pages/');
    const basePath = isSubPage ? '../includes/' : 'includes/';
    
    includeHTML("header", basePath + "header2.html");
    includeHTML("footer", basePath + "footer.html");
});
