  (function() {
      // ----- PRODUCT DATA (machinery with images, prices, specs) -----
      const products = [
        {
          name: "Mahindra 475 DI",
          category: "tractor",
          price: "$25,000",
          specs: "75 HP · 2023 model · 2WD",
          image: "pexels-acecranesindia-32945048.jpg",
          alt: "Mahindra tractor"
        },
        {
          name: "John Deere S780",
          category: "harvester",
          price: "$350,000",
          specs: "300 HP · 2024 · 40ft header",
          image: "pexels-miken-33793649.jpg",
          alt: "John Deere combine harvester"
        },
        {
          name: "Kubota Disc Plow",
          category: "tillage",
          price: "$4,500",
          specs: "4-bottom · 20'' discs · 3‑point",
          image: "pexels-mirkofabian-12495810.jpg",
          alt: "Kubota disc plow"
        },
        {
          name: "New Holland SW250",
          category: "harvester",
          price: "$45,000",
          specs: "16ft swather · 120 HP · turbo",
          image: "pexels-frank-nowicki-545360787-16623692.jpg",
          alt: "New Holland swather"
        },
        {
          name: "Massey Ferguson 1840",
          category: "harvester",
          price: "$30,000",
          specs: "Round baler · 5x6 bales · net wrap",
          image: "pexels-raymond-eichelberger-3213541-9782917.jpg",
          alt: "Massey Ferguson baler"
        },
        {
          name: "Case IH Tiger-Mate",
          category: "tillage",
          price: "$12,000",
          specs: "24ft cultivator · 150 HP · folding",
          image: "pexels-wolfgang-weiser-467045605-23879282.jpg",
          alt: "Case IH field cultivator"
        }
      ];

      // Helper to resolve image paths based on current directory
      function getProductImagePath(imgName) {
          return '/assets/img/' + imgName;
      }

      const gallery = document.getElementById('gallery');
      const filterBtns = document.querySelectorAll('.filter-btn');

      // render products based on filter
      function renderGallery(filter = 'all') {
        let html = '';
        products.forEach(prod => {
          if (filter === 'all' || prod.category === filter) {
            html += `
              <div class="card" data-category="${prod.category}">
                <img class="card-img" src="${getProductImagePath(prod.image)}" alt="${prod.alt}" loading="lazy">
                <div class="card-content">
                  <div class="card-title">${prod.name}</div>
                  <div class="card-price">${prod.price}</div>
                  <div class="card-specs">${prod.specs}</div>
                  <div class="card-actions">
                    <button class="btn btn-primary buy-btn">Buy Now</button>
                    <button class="btn btn-secondary details-btn">View Details</button>
                  </div>
                </div>
              </div>
            `;
          }
        });
        gallery.innerHTML = html;

        // attach event listeners to the new buttons
        document.querySelectorAll('.buy-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert('🛒 Added to cart! (demo)');
          });
        });
        document.querySelectorAll('.details-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert('📋 View details – more specifications would appear here.');
          });
        });
      }

      // initial render
      renderGallery('all');

      // filter button active state + re-render
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // update active class
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filterValue = btn.getAttribute('data-filter');
          renderGallery(filterValue);
        });
      });

      
      
    })();