(function ($) {
    "use strict";

    let portfolioData = [];
    let currentPortfolioItem = null;

    // Create fallback image function
    function createFallbackImage(text, color = '8750f7') {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // Background
        ctx.fillStyle = `#${color}`;
        ctx.fillRect(0, 0, 400, 300);
        
        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 200, 150);
        
        return canvas.toDataURL();
    }

    // Handle image load errors
    function handleImageError(img, fallbackText, color) {
        img.onerror = function() {
            this.src = createFallbackImage(fallbackText, color);
            this.onerror = null;
        };
    }

    // Load portfolio data from JSON
    function loadPortfolioData() {
        return $.getJSON('portfolio-data.json')
            .done(function(data) {
                portfolioData = data.portfolio;
                renderPortfolioItems();
                renderFilterButtons();
            })
            .fail(function() {
                console.error('Failed to load portfolio data');
                // Create fallback data if JSON fails
                createFallbackData();
            });
    }

    // Helper: Extract YouTube video ID from URL
    function getYouTubeId(url) {
        if (!url) return null;
        const match = url.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        );
        return match ? match[1] : null;
    }

    // Generate YouTube preview HTML
    function generateYouTubePreview(videoUrl) {
        const videoId = getYouTubeId(videoUrl);
        if (!videoId) return '';
        const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        // Unique id for this preview
        const previewId = 'yt-preview-' + Math.random().toString(36).substr(2, 9);
        return `
            <div class="youtube-preview" style="margin-top:24px;">
                <div id="${previewId}-container" style="position:relative;display:inline-block;cursor:pointer;max-width:480px;">
                    <img src="${thumbnail}" alt="YouTube Preview" style="width:100%;max-width:480px;display:block;border-radius:8px;">
                    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:48px;color:white;text-shadow:0 2px 8px #000;">&#9658;</div>
                </div>
                <div style="margin-top:8px;">
                    <a href="${videoUrl}" target="_blank" rel="noopener noreferrer">View on YouTube</a>
                </div>
                <script>
                (function(){
                    var loaded = false;
                    document.getElementById('${previewId}-container').onclick = function() {
                        if(loaded) return;
                        loaded = true;
                        this.innerHTML = '<iframe width="480" height="270" src="${embedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen title="YouTube Video"></iframe>';
                    };
                })();
                </script>
            </div>
        `;
    }

    // Generate portfolio popup content with theme-consistent design
    function generatePortfolioPopup(item) {
        const techList = item.tech ? item.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : '';
        const featuresList = item.features ? item.features.map(feature => `<li>${feature}</li>`).join('') : '';
        
        // Handle category display
        const categoryDisplay = Array.isArray(item.categoryNames) 
            ? item.categoryNames.join(', ') 
            : 'Full Stack Development';

        return `
            <div class="popup_content_area">
                <div class="popup_header">
                    <div class="popup_modal_img">
                        <img src="${'assets/img/portfolio/'+item.thumbnail || createFallbackImage(item.title, getColorForCategory(item.primaryCategory))}" alt="${item.title}" />
                    </div>
                </div>
                
                <div class="popup_modal_content" style="margin-top: 20px;">
                    <div class="portfolio_info">
                        <div class="portfolio_info_text">
                            <h2 class="title">${item.title}</h2>
                            <div class="desc">
                                <p>${item.description}</p>
                            </div>
                            
                            ${item.role ? `
                            <div class="project-role" style="margin-top: 10px;">
                                <h4><i class="flaticon-user"></i> My Role</h4>
                                <p>${item.role}</p>
                            </div>
                            ` : ''}
                            
                            <div class="btn-group">
                                ${item.liveLink ? `<a href="${item.liveLink}" target="_blank" class="tj-btn-primary">
                                    Live Preview <i class="flaticon-up-right-arrow"></i>
                                </a>` : ''}
                                ${item.repoLink ? `<a href="${item.repoLink}" target="_blank" class="tj-btn-secondary">
                                    View Code
                                </a>` : ''}
                            </div>
                        </div>
                    </div>
                    
                    ${item.features && item.features.length > 0 ? `
                    <div class="portfolio_features">
                        <h3 class="title"><i class="flaticon-star"></i> Key Features</h3>
                        <ul class="features-list">
                            ${featuresList}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <div class="portfolio_technologies">
                        <h3 class="title"><i class="flaticon-tools"></i> Technologies Used</h3>
                        <div class="tech-grid">
                            ${item.tech ? item.tech.map(tech => `<div class="tech-item">${tech}</div>`).join('') : '<div class="tech-item">No technologies specified</div>'}
                        </div>
                    </div>
                    
                    ${item.video ? `
                    <div class="portfolio_demo">
                        <h3 class="title">
                            <i class="flaticon-video"></i> 
                            Project Demo
                        </h3>
                        <p>Watch the live demonstration of this project to see all features in action.</p>
                        
                    </div>
                    ${generateYouTubePreview(item.video)}
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Create fallback data if JSON loading fails
    function createFallbackData() {
        portfolioData = [
            {
                id: "p1",
                title: "CaptionCrafter",
                description: "An AI-powered caption generator that helps users create engaging captions tailored to their tone and social media platform.",
                tech: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "Firebase", "Gemini AI"],
                video: "https://www.youtube.com/watch?v=N1JTC3zveLI",
                liveLink: "https://captions-crafter.vercel.app/",
                repoLink: "https://github.com/apsdeveloper461/caption-crafter-landing-page",
                features: [
                    "AI-generated captions based on user input",
                    "Tone customization (e.g. professional, casual)",
                    "Platform-specific optimization",
                    "Fast and responsive UI"
                ],
                role: "Developed full-stack features including AI integration with Gemini",
                categories: ["full-stack-app", "ai-integration", "firebase-integration"],
                categoryNames: ["Full Stack App", "AI Integration", "Firebase Integration"],
                primaryCategory: "full-stack-app",
                thumbnail: createFallbackImage("CaptionCrafter", "8b5cf6")
            },
            {
                id: "p2", 
                title: "UET Routes Management System",
                description: "A transport and route management platform for university students, drivers, and admins.",
                tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Socket.io"],
                video: "https://www.youtube.com/watch?v=NXba6-kYukI",
                liveLink: "https://uet-rms-final.vercel.app/",
                repoLink: "https://github.com/apsdeveloper461/uet-rms-final",
                features: [
                    "Role-based system: Student, Driver, Admin",
                    "Live bus location tracking",
                    "Complaint management system",
                    "Chat functionality between roles"
                ],
                role: "Developed the backend logic and location tracking services",
                categories: ["full-stack-app"],
                categoryNames: ["Full Stack App"],
                primaryCategory: "full-stack-app",
                thumbnail: createFallbackImage("UET Routes", "3b82f6")
            }
        ];
        renderPortfolioItems();
        renderFilterButtons();
    }

    // Get unique categories from portfolio data
    function getUniqueCategories() {
        const allCategories = [];
        
        portfolioData.forEach(item => {
            if (Array.isArray(item.categories)) {
                item.categories.forEach((category, index) => {
                    const categoryName = item.categoryNames[index] || category;
                    allCategories.push({
                        category: category,
                        name: categoryName
                    });
                });
            } else {
                allCategories.push({
                    category: item.primaryCategory || 'full-stack-app',
                    name: item.categoryNames ? item.categoryNames[0] : 'Full Stack App'
                });
            }
        });
        
        // Remove duplicates based on category slug
        return allCategories.filter((item, index, self) => 
            index === self.findIndex(t => t.category === item.category)
        );
    }

    // Render filter buttons dynamically
    function renderFilterButtons() {
        const categories = getUniqueCategories();
        const buttonGroup = $('.portfolio-filter .button-group');
        
        // Clear existing buttons except "All"
        buttonGroup.find('button:not([data-filter="*"])').remove();
        
        // Add category buttons
        categories.forEach(cat => {
            const button = $(`<button data-filter=".${cat.category}">${cat.name}</button>`);
            buttonGroup.append(button);
        });
    }

    // Render portfolio items dynamically
    function renderPortfolioItems() {
        const portfolioContainer = $('.portfolio-box');
        
        // Hide loading
        $('.portfolio-loading').hide();
        
        // Clear existing items except sizer and gutter
        portfolioContainer.find('.portfolio-item').remove();
        
        portfolioData.forEach((item, index) => {
            // Create category classes string
            const categoryClasses = Array.isArray(item.categories) 
                ? item.categories.join(' ') 
                : (item.primaryCategory || 'full-stack-app');
            
            // Get primary category for display
            const primaryCategoryName = Array.isArray(item.categoryNames) 
                ? item.categoryNames[0] 
                : 'Full Stack App';

            // Create image source with proper error handling
            let imageSrc;
            if (item.thumbnail) {
                if (item.thumbnail.startsWith('http') || item.thumbnail.startsWith('data:')) {
                    imageSrc = item.thumbnail;
                } else {
                    imageSrc = `assets/img/portfolio/${item.thumbnail}`;
                }
            } else {
                imageSrc = createFallbackImage(item.title, getColorForCategory(categoryClasses.split(' ')[0]));
            }

            const portfolioItem = $(`
                <div class="portfolio-item ${categoryClasses}">
                    <div class="image-box">
                        <img src="${imageSrc}" alt="${item.title}">
                       
                        
                    </div>
                    <div class="content-box">
                        <h4 class="portfolio-title">${item.title}</h4>
                       
                        
                        <div class="portfolio-meta">
                         <div class="portfolio-categories">
                            ${Array.isArray(item.categoryNames) 
                                ? item.categoryNames.slice(0, 2).map(cat => `<span class="category-tag">${cat}</span>`).join(', ') 
                                : `<span class="category-tag">${primaryCategoryName}</span>`
                            }
                        </div>
                            <button class="portfolio-link modal-popup" data-portfolio-id="${item.id}">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `);
            
            // Handle image error for portfolio items
            const img = portfolioItem.find('img')[0];
            const primaryCategory = Array.isArray(item.categories) ? item.categories[0] : (item.primaryCategory || 'full-stack-app');
            handleImageError(img, item.title, getColorForCategory(primaryCategory));
            
            portfolioContainer.append(portfolioItem);
            
            // Add animation delay
            setTimeout(() => {
                portfolioItem.addClass('loaded');
            }, index * 100);
        });

        // Initialize Isotope after items are added
        setTimeout(() => {
            if (portfolioContainer.data('isotope')) {
                portfolioContainer.isotope('reloadItems').isotope();
            } else {
                initIsotope();
            }
        }, 500);
    }

    // Get color for category
    function getColorForCategory(category) {
        const colors = {
            'full-stack-app': '3b82f6',
            'ai-integration': '8b5cf6',
            'firebase-integration': '10b981',
            'only-frontend': 'f59e0b',
            'data-analytics': 'ef4444',
            'mobile-app': '84cc16'
        };
        return colors[category] || '8750f7';
    }

    // Initialize Isotope
    function initIsotope() {
        const $grid = $('.portfolio-box').isotope({
            masonry: {
                columnWidth: '.portfolio-box .portfolio-sizer',
                gutter: '.portfolio-box .gutter-sizer',
            },
            itemSelector: '.portfolio-box .portfolio-item',
            percentPosition: true,
        });

        return $grid;
    }

    // Handle portfolio item click
    function handlePortfolioClick(portfolioId) {
        const item = portfolioData.find(p => p.id == portfolioId);
        if (!item) return;

        currentPortfolioItem = item;
        const popupContent = `
            <div class="portfolio-theme-popup">
                ${generatePortfolioPopup(item)}
            </div>
        `;

        // Create modal popup
        const modalHtml = `<div id="portfolio-popup-${item.id}" >${popupContent}</div>`;

        // Remove existing modal if any
        $(`#portfolio-popup-${item.id}`).remove();
        $('body').append(modalHtml);

        // Open popup
        $.magnificPopup.open({
            items: {
                src: `#portfolio-popup-${item.id}`,
                type: 'inline'
            },
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'popup-mfp portfolio-theme-popup-mfp',
            callbacks: {
                open: function() {
                    // Handle image errors in popup
                    const popupImages = $(`#portfolio-popup-${item.id} img`);
                    popupImages.each(function(index) {
                        const img = this;
                        const primaryCategory = Array.isArray(item.categories) ? item.categories[0] : item.primaryCategory;
                        handleImageError(img, `${item.title} ${index + 1}`, getColorForCategory(primaryCategory));
                    });
                },
                close: function() {
                    // Clean up
                    $(`#portfolio-popup-${item.id}`).remove();
                }
            }
        });
    }

    // Update filter functionality for dynamic content with active background animation
    function updateActiveBackground(activeButton) {
        const buttonGroup = $('.portfolio-filter .button-group');
        const activeBg = buttonGroup.find('.active-bg');
        const buttons = buttonGroup.find('button');
        
        if (activeButton && activeBg.length) {
            const buttonIndex = buttons.index(activeButton);
            const buttonWidth = activeButton.offsetWidth;
            const buttonLeft = activeButton.offsetLeft;
            
            activeBg.css({
                'width': buttonWidth + 'px',
                'left': buttonLeft + 'px'
            });
        }
    }

    // Initialize portfolio system
    function initPortfolio() {
        loadPortfolioData().then(() => {
            // Handle portfolio item clicks
            $(document).on('click', '.portfolio-link[data-portfolio-id]', function(e) {
                e.preventDefault();
                const portfolioId = $(this).data('portfolio-id');
                handlePortfolioClick(portfolioId);
            });

            // Update filter functionality for dynamic content
            $('.portfolio-filter .button-group').on('click', 'button', function() {
                $('.portfolio-filter .button-group button').removeClass('active');
                $(this).addClass('active');
                
                // Update active background position
                updateActiveBackground(this);

                const filterValue = $(this).attr('data-filter');
                if ($('.portfolio-box').data('isotope')) {
                    $('.portfolio-box').isotope({ filter: filterValue });
                }
            });

            // Initialize active background position on load
            setTimeout(() => {
                const activeButton = $('.portfolio-filter .button-group button.active')[0];
                if (activeButton) {
                    updateActiveBackground(activeButton);
                }
            }, 1000);
        });
    }

    // Initialize when document is ready
    $(document).ready(function() {
        initPortfolio();
    });

})(jQuery);
