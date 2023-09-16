window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

// jQuery code
$(document).ready(function () {
    // Show or hide the button based on scroll position
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#scrollToTopBtn').fadeIn();
        } else {
            $('#scrollToTopBtn').fadeOut();
        }
    });

    // Scroll to top when the button is clicked
    $('#scrollToTopBtn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
});


// Animation
function handleAnimation(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const animationClass = entry.target.dataset.animation;
            entry.target.classList.add(animationClass);
            entry.target.classList.remove('hidden');
            observer.unobserve(entry.target);
        }
    });
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver(handleAnimation, options);
const targets = document.querySelectorAll('.animate__animated');

targets.forEach((target) => {
    observer.observe(target);
});

// Blog

const blogPostsContainer = document.getElementById('blog-posts');
let blogPostsData;
const postsPerPage = 8; // Number of posts per page
let currentPage = 1; // Current page number

fetch('blog-posts.json')
    .then(response => response.json())
    .then(data => {
        blogPostsData = data;
        displayBlogPosts(currentPage); // Display the initial page
    })
    .catch(error => console.error('Error fetching blog posts:', error));

function displayBlogPosts(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToDisplay = blogPostsData.slice(startIndex, endIndex);

    blogPostsContainer.innerHTML = '';

    postsToDisplay.forEach((post, index) => {
        const postTile = document.createElement('div');
        postTile.classList.add('blog-post-tile');
        postTile.dataset.index = startIndex + index;
        postTile.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <h3>${post.title}</h3>
      <p>${post.date}</p>
    `;
        postTile.addEventListener('click', () => openBlogPost(startIndex + index));
        blogPostsContainer.appendChild(postTile);
    });

    // Update pagination controls
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(blogPostsData.length / postsPerPage);
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    prevPageButton.classList.toggle('disabled', currentPage === 1);
    nextPageButton.classList.toggle('disabled', currentPage === totalPages);
}

function goToPage(page) {
    if (page >= 1 && page <= Math.ceil(blogPostsData.length / postsPerPage)) {
        currentPage = page;
        displayBlogPosts(currentPage);
    }
}

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(blogPostsData.length / postsPerPage);
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
});


function openBlogPost(index) {
    const selectedPost = blogPostsData[index];
    const modalContent = `
          <div class="modal-header">
            <h2 class="modal-title">${selectedPost.title}</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="image-container">
                <img src="${selectedPost.image}" alt="${selectedPost.title}">
            </div>
            ${selectedPost.content.map(paragraph => `<p>${paragraph}</p>`).join('')}

            <p>${selectedPost.date}</p>
            <div class="d-flex justify-content-end">
            <div class="btn-group">
              <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Share
              </button>
              <div class="dropdown-menu">
                <button class="dropdown-item" onclick="sharePostOnTwitter(${index})">Share on Twitter</button>
                <button class="dropdown-item" onclick="sharePostOnFacebook(${index})">Share on Facebook</button>
                <button class="dropdown-item" onclick="sharePostOnLinkedIn(${index})">Share on LinkedIn</button>
                <button class="dropdown-item" onclick="sharePostOnWhatsApp(${index})">Share on WhatsApp</button>
                <button class="dropdown-item" onclick="sharePostOnPinterest(${index})">Share on Pinterest</button>
                <!-- Add more sharing options as needed -->
              </div>
            </div>
          </div>
          </div>
        `;

    // Get a reference to the modal content
    const modalBody = document.querySelector('#blogPostModal .modal-content');

    // Set the modal content
    modalBody.innerHTML = modalContent;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('blogPostModal'));
    modal.show();
}

function sharePostOnTwitter(index) {
    const selectedPost = blogPostsData[index];
    const tweetText = encodeURIComponent(selectedPost.shareText + ' ' + selectedPost.link);
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

    // Open a new window/tab for sharing on Twitter
    window.open(twitterShareUrl, '_blank');
}


function sharePostOnFacebook(index) {
    const selectedPost = blogPostsData[index];
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(selectedPost.link)}`;

    // Open a new window/tab for sharing on Facebook
    window.open(facebookShareUrl, '_blank');
}

function sharePostOnLinkedIn(index) {
    const selectedPost = blogPostsData[index];
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(selectedPost.link)}`;

    // Open a new window/tab for sharing on LinkedIn
    window.open(linkedInShareUrl, '_blank');
}

function sharePostOnWhatsApp(index) {
    const selectedPost = blogPostsData[index];
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(selectedPost.title + ' ' + selectedPost.link)}`;

    // Open a new window/tab for sharing on WhatsApp
    window.open(whatsappShareUrl, '_blank');
}


function shareOnPinterest(imageUrl, title) {
    const pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title)}`;

    // Open a new window/tab for sharing on Pinterest
    window.open(pinterestShareUrl, '_blank');
}

function sharePostOnPinterest(index) {
    try {
        const selectedPost = blogPostsData[index];

        // Check if selectedPost is valid
        if (!selectedPost) {
            throw new Error("Selected post is undefined or doesn't exist.");
        }

        // Construct an absolute URL to the image assuming it's hosted on your website
        const baseUrl = window.location.origin; // Get the base URL of your website
        const absoluteImageUrl = baseUrl + selectedPost.image; // Assuming selectedPost.image is a relative path

        // Ensure that the absolute image URL is properly formatted
        const formattedImageUrl = absoluteImageUrl.replace(/\/\//g, '/'); // Remove any double slashes

        // Construct the Pinterest share URL with the properly formatted image URL
        const pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(selectedPost.link)}&media=${encodeURIComponent(formattedImageUrl)}&description=${encodeURIComponent(selectedPost.title)}`;

        console.log("Pinterest Share URL:", pinterestShareUrl);

        // Open a new window/tab for sharing on Pinterest
        window.open(pinterestShareUrl, '_blank');
    } catch (error) {
        console.error("Error sharing on Pinterest:", error.message);
    }
}


// Add a click event listener to all buttons with the "open-modal" class
document.querySelectorAll('.open-modal').forEach(function (button) {
    button.addEventListener('click', function () {
        // Get the index from the data attribute
        const index = parseInt(button.getAttribute('data-index'));

        // Check if the index is valid
        if (!isNaN(index) && index >= 0 && index < blogPostsData.length) {
            // Populate the selectedPost object
            const selectedPost = blogPostsData[index];

            // Now, selectedPost.link should contain a valid URL to the blog post
            console.log("Selected Post:", selectedPost);

            // Open the modal with the selectedPost data
            // ... (code to open the modal with the selectedPost data)
        }
    });
});



// JavaScript code to create a typewriter effect
function typeWriter(text, element, speed) {
    let i = 0;
    element.innerHTML = "";

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// JavaScript code to create a typewriter effect
function typeWriter(text, element, speed) {
    let i = 0;
    element.innerHTML = "";

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Check if the blog section is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Start the typewriter effect when the blog section is in the viewport
// JavaScript code to create a typewriter effect for multiple lines
function typeWriter(text, element, speed) {
    let i = 0;
    element.innerHTML = ""; // Clear the element's content

    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                // If a newline character is encountered, add a line break
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Check if the blog section is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Start the typewriter effect when the blog section is in the viewport
function startTypingWhenVisible() {
    const blogTitle = document.getElementById("blog-title");
    const textToType = "Silly Girl Blog\nDiscover Our Stories"; // Your blog title with a line break
    const typingSpeed = 100; // Adjust the typing speed (milliseconds per character)

    if (isElementInViewport(blogTitle)) {
        // Trigger the typewriter effect
        typeWriter(textToType, blogTitle, typingSpeed);

        // Remove the scroll event listener to prevent multiple triggers
        window.removeEventListener("scroll", startTypingWhenVisible);
    }
}

// Add a scroll event listener to check when the blog section is in the viewport
window.addEventListener("scroll", startTypingWhenVisible);


// Filter 

// Fetch and set the data
let originalBlogPostsData; // Declare the variable

fetch('blog-posts.json')
    .then(response => response.json())
    .then(data => {
        originalBlogPostsData = data; // Set the data here
        blogPostsData = data; // If needed, set your main data variable here as well
        displayBlogPosts(currentPage); // Display the initial page
    })
    .catch(error => console.error('Error fetching blog posts:', error));

const filterCategory = document.getElementById('filter-category');

// Define the displayFilteredBlogPosts function separately
function displayFilteredBlogPosts(filteredPosts) {
    // Clear the existing blog posts
    blogPostsContainer.innerHTML = '';

    // Display the filtered blog posts
    filteredPosts.forEach((post, index) => {
        const postTile = document.createElement('div');
        postTile.classList.add('blog-post-tile');
        postTile.dataset.index = index;
        postTile.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <h3>${post.title}</h3>
            <p>${post.date}</p>
        `;
        postTile.addEventListener('click', () => openBlogPost(index));
        blogPostsContainer.appendChild(postTile);
    });

    // Update pagination controls if needed
    updatePagination();
}

// Add the event listener for filtering
filterCategory.addEventListener('change', () => {
    const selectedCategory = filterCategory.value;

    // Create a copy of the original data to filter
    const filteredPosts = originalBlogPostsData.filter(post => {
        // If no category is selected or the post matches the selected category
        return selectedCategory === '' || post.category === selectedCategory;
    });

    // Use the displayFilteredBlogPosts function to display the filtered posts
    displayFilteredBlogPosts(filteredPosts);
});
