// Product array for dynamic select options
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    avgRating: 4.5,
  },
  {
    id: "fc-2050",
    name: "power laces",
    avgRating: 4.7,
  },
  {
    id: "fs-1987",
    name: "time circuits",
    avgRating: 3.5,
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    avgRating: 3.9,
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    avgRating: 5.0,
  },
];

// Function to populate product select options
function populateProducts() {
  const productSelect = document.getElementById("product-name");

  // Clear existing options except the placeholder
  productSelect.innerHTML =
    '<option value="" disabled selected>Select a Product ...</option>';

  // Add each product as an option
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    option.dataset.id = product.id;
    option.dataset.rating = product.avgRating;
    productSelect.appendChild(option);
  });
}

// Function to handle star rating interactions
function setupStarRating() {
  const ratingInputs = document.querySelectorAll('input[name="rating"]');
  const starLabels = document.querySelectorAll(".star-label");

  ratingInputs.forEach((input, index) => {
    input.addEventListener("change", function () {
      updateStarDisplay(index + 1);
    });
  });

  // Add hover effects
  starLabels.forEach((label, index) => {
    label.addEventListener("mouseenter", function () {
      highlightStars(index + 1, true);
    });

    label.addEventListener("mouseleave", function () {
      const checkedRating = document.querySelector(
        'input[name="rating"]:checked',
      );
      if (checkedRating) {
        updateStarDisplay(parseInt(checkedRating.value));
      } else {
        resetStars();
      }
    });
  });
}

function updateStarDisplay(rating) {
  const starLabels = document.querySelectorAll(".star-label");

  starLabels.forEach((label, index) => {
    if (index < rating) {
      label.style.color = "var(--accent-color)";
      label.innerHTML = `★ ${index + 1}`;
    } else {
      label.style.color = "var(--light-border)";
      label.innerHTML = `☆ ${index + 1}`;
    }
  });
}

function highlightStars(rating, isHover = false) {
  const starLabels = document.querySelectorAll(".star-label");

  starLabels.forEach((label, index) => {
    if (index < rating) {
      label.style.color = "var(--accent-color)";
      label.innerHTML = `★ ${index + 1}`;
    } else {
      label.style.color = "var(--light-border)";
      label.innerHTML = `☆ ${index + 1}`;
    }
  });
}

function resetStars() {
  const starLabels = document.querySelectorAll(".star-label");
  starLabels.forEach((label, index) => {
    label.style.color = "var(--light-border)";
    label.innerHTML = `☆ ${index + 1}`;
  });
}

// Function to handle form submission and localStorage
function setupFormSubmission() {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    // Prevent default submission to add localStorage functionality
    event.preventDefault();

    // Increment review counter in localStorage
    let reviewCount = parseInt(localStorage.getItem("reviewCount") || "0");
    reviewCount++;
    localStorage.setItem("reviewCount", reviewCount.toString());

    // Store the current review data
    const formData = new FormData(form);
    const reviewData = {
      productName: formData.get("product-name"),
      rating: formData.get("rating"),
      installationDate: formData.get("installation-date"),
      features: formData.getAll("features"),
      writtenReview: formData.get("written-review"),
      userName: formData.get("user-name"),
      reviewDate: new Date().toISOString(),
      reviewNumber: reviewCount,
    };

    // Store this review in localStorage
    localStorage.setItem(`review_${reviewCount}`, JSON.stringify(reviewData));

    // Create URL with form data for GET method submission
    const url = new URL(
      "review.html",
      window.location.origin +
        window.location.pathname.replace("form.html", ""),
    );
    const params = new URLSearchParams();

    // Add all form data to URL parameters
    for (let [key, value] of formData.entries()) {
      params.append(key, value);
    }

    // Add review count
    params.append("reviewCount", reviewCount);

    url.search = params.toString();

    // Navigate to review page
    window.location.href = url.toString();
  });
}

// Function to setup checkbox interactions
function setupCheckboxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const checkboxItem = this.closest(".checkbox-item");
      if (this.checked) {
        checkboxItem.style.backgroundColor = "rgba(0, 188, 212, 0.1)";
        checkboxItem.style.borderColor = "var(--secondary-color)";
      } else {
        checkboxItem.style.backgroundColor = "var(--background-color)";
        checkboxItem.style.borderColor = "var(--light-border)";
      }
    });
  });
}

// Function to set today's date as default for installation date
function setDefaultDate() {
  const dateInput = document.getElementById("installation-date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
}

// Function to add form validation feedback
function setupFormValidation() {
  const requiredFields = document.querySelectorAll(
    "input[required], select[required]",
  );

  requiredFields.forEach((field) => {
    field.addEventListener("blur", function () {
      if (!this.value) {
        this.style.borderColor = "var(--error-color)";
        this.style.boxShadow = "0 0 0 3px rgba(244, 67, 54, 0.2)";
      } else {
        this.style.borderColor = "var(--success-color)";
        this.style.boxShadow = "0 0 0 3px rgba(76, 175, 80, 0.2)";
      }
    });

    field.addEventListener("focus", function () {
      this.style.borderColor = "var(--secondary-color)";
      this.style.boxShadow = "0 0 0 3px rgba(0, 188, 212, 0.2)";
    });
  });
}

// Function to display current review count
function displayReviewCount() {
  const reviewCount = localStorage.getItem("reviewCount") || "0";

  // Add review count display to the form
  const main = document.querySelector("main");
  const countDisplay = document.createElement("div");
  countDisplay.className = "review-count-display";
  countDisplay.innerHTML = `
        <p><strong>Reviews Completed:</strong> ${reviewCount}</p>
    `;
  countDisplay.style.cssText = `
        background-color: var(--secondary-color);
        color: var(--white);
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
        margin-bottom: 1rem;
        font-family: 'Poppins', sans-serif;
    `;

  main.insertBefore(countDisplay, main.firstChild);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  populateProducts();
  setupStarRating();
  setupFormSubmission();
  setupCheckboxes();
  setDefaultDate();
  setupFormValidation();
  displayReviewCount();

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = "smooth";

  // Log that the form is ready
  console.log("Product Review Form initialized successfully");
  console.log(`${products.length} products loaded`);
  console.log(`Review count: ${localStorage.getItem("reviewCount") || "0"}`);
});

// Export functions for testing purposes (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    products,
    populateProducts,
    updateStarDisplay,
    setupFormSubmission,
  };
}
