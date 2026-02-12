// Function to get URL parameters
function getURLParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const params = {};

  for (const [key, value] of urlParams) {
    if (params[key]) {
      // Handle multiple values (like checkboxes)
      if (Array.isArray(params[key])) {
        params[key].push(value);
      } else {
        params[key] = [params[key], value];
      }
    } else {
      params[key] = value;
    }
  }

  return params;
}

// Function to display review details
function displayReviewDetails() {
  const params = getURLParameters();
  const reviewDetailsContainer = document.getElementById("reviewDetails");

  if (!reviewDetailsContainer) return;

  let detailsHTML = "";

  // Product Name
  if (params["product-name"]) {
    detailsHTML += `
            <div class="review-detail">
                <strong>Product:</strong> ${params["product-name"]}
            </div>
        `;
  }

  // Rating with stars
  if (params["rating"]) {
    const rating = parseInt(params["rating"]);
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    detailsHTML += `
            <div class="review-detail">
                <strong>Rating:</strong> ${stars} (${rating}/5)
            </div>
        `;
  }

  // Installation Date
  if (params["installation-date"]) {
    const date = new Date(params["installation-date"]);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    detailsHTML += `
            <div class="review-detail">
                <strong>Installation Date:</strong> ${formattedDate}
            </div>
        `;
  }

  // Features
  if (params["features"]) {
    const features = Array.isArray(params["features"])
      ? params["features"]
      : [params["features"]];
    const formattedFeatures = features
      .map((feature) =>
        feature.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      )
      .join(", ");

    detailsHTML += `
            <div class="review-detail">
                <strong>Useful Features:</strong> ${formattedFeatures}
            </div>
        `;
  }

  // Written Review
  if (params["written-review"] && params["written-review"].trim()) {
    detailsHTML += `
            <div class="review-detail">
                <strong>Written Review:</strong> "${params["written-review"]}"
            </div>
        `;
  }

  // User Name
  if (params["user-name"] && params["user-name"].trim()) {
    detailsHTML += `
            <div class="review-detail">
                <strong>Reviewer:</strong> ${params["user-name"]}
            </div>
        `;
  }

  // Review Date
  const reviewDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  detailsHTML += `
        <div class="review-detail">
            <strong>Submission Date:</strong> ${reviewDate}
        </div>
    `;

  reviewDetailsContainer.innerHTML = detailsHTML;
}

// Function to update statistics
function updateStatistics() {
  // Get current review count from localStorage
  let reviewCount = parseInt(localStorage.getItem("reviewCount") || "0");

  // If we have a reviewCount parameter, use that (it's more recent)
  const params = getURLParameters();
  if (params["reviewCount"]) {
    reviewCount = parseInt(params["reviewCount"]);
    localStorage.setItem("reviewCount", reviewCount.toString());
  }

  // Update total reviews display
  const totalReviewsElement = document.getElementById("totalReviews");
  if (totalReviewsElement) {
    totalReviewsElement.textContent = reviewCount;
  }

  // Update this review number
  const reviewNumberElement = document.getElementById("reviewNumber");
  if (reviewNumberElement) {
    reviewNumberElement.textContent = reviewCount;
  }

  // Calculate average rating from stored reviews
  const avgRatingElement = document.getElementById("avgRating");
  if (avgRatingElement) {
    const averageRating = calculateAverageRating();
    avgRatingElement.textContent = averageRating.toFixed(1);
  }
}

// Function to calculate average rating from localStorage
function calculateAverageRating() {
  let totalRating = 0;
  let reviewCount = 0;

  // Get all stored reviews
  for (
    let i = 1;
    i <= parseInt(localStorage.getItem("reviewCount") || "0");
    i++
  ) {
    const reviewData = localStorage.getItem(`review_${i}`);
    if (reviewData) {
      try {
        const review = JSON.parse(reviewData);
        if (review.rating) {
          totalRating += parseInt(review.rating);
          reviewCount++;
        }
      } catch (e) {
        console.warn(`Error parsing review ${i}:`, e);
      }
    }
  }

  // Also include current review if rating is in URL params
  const params = getURLParameters();
  if (params["rating"]) {
    totalRating += parseInt(params["rating"]);
    reviewCount++;
  }

  return reviewCount > 0 ? totalRating / reviewCount : 0;
}

// Function to add celebration animation
function addCelebrationEffect() {
  // Create confetti effect
  const colors = ["#1a237e", "#00bcd4", "#ff6b35", "#4caf50"];

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      createConfetti(colors[Math.floor(Math.random() * colors.length)]);
    }, i * 30);
  }
}

function createConfetti(color) {
  const confetti = document.createElement("div");
  confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background-color: ${color};
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 1000;
        pointer-events: none;
        transform: rotate(${Math.random() * 360}deg);
        animation: confetti-fall 3s linear forwards;
    `;

  // Add keyframe animation if not already added
  if (!document.querySelector("#confetti-style")) {
    const style = document.createElement("style");
    style.id = "confetti-style";
    style.textContent = `
            @keyframes confetti-fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  document.body.appendChild(confetti);

  // Remove confetti after animation
  setTimeout(() => {
    if (confetti.parentNode) {
      confetti.parentNode.removeChild(confetti);
    }
  }, 3000);
}

// Function to log review analytics
function logAnalytics() {
  const params = getURLParameters();
  const reviewCount = localStorage.getItem("reviewCount") || "0";

  console.log("Review Analytics:", {
    reviewNumber: reviewCount,
    productReviewed: params["product-name"] || "Unknown",
    rating: params["rating"] || "Not rated",
    featuresSelected: params["features"] || "None",
    hasWrittenReview: !!(
      params["written-review"] && params["written-review"].trim()
    ),
    reviewerProvided: !!(params["user-name"] && params["user-name"].trim()),
    averageRating: calculateAverageRating(),
    timestamp: new Date().toISOString(),
  });
}

// Function to handle potential errors gracefully
function handleErrors() {
  window.addEventListener("error", function (event) {
    console.error("Review page error:", event.error);

    // Show a user-friendly error message
    const errorDiv = document.createElement("div");
    errorDiv.style.cssText = `
            background-color: var(--error-color);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            text-align: center;
        `;
    errorDiv.textContent =
      "There was an issue loading your review details, but your review was still submitted successfully!";

    const main = document.querySelector("main");
    if (main) {
      main.insertBefore(errorDiv, main.firstChild);
    }
  });
}

// Function to setup smooth animations
function setupAnimations() {
  // Animate elements on load
  const elements = document.querySelectorAll(".confirmation-container > *");
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
  });

  // Add keyframe animation
  if (!document.querySelector("#fade-in-style")) {
    const style = document.createElement("style");
    style.id = "fade-in-style";
    style.textContent = `
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
    document.head.appendChild(style);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Handle potential errors
  handleErrors();

  // Set up animations
  setupAnimations();

  // Display review details from URL parameters
  displayReviewDetails();

  // Update statistics
  updateStatistics();

  // Log analytics
  logAnalytics();

  // Add celebration effect
  setTimeout(() => {
    addCelebrationEffect();
  }, 500);

  // Add smooth scrolling
  document.documentElement.style.scrollBehavior = "smooth";

  console.log("Review confirmation page loaded successfully");
});

// Export functions for testing purposes (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getURLParameters,
    displayReviewDetails,
    updateStatistics,
    calculateAverageRating,
  };
}
