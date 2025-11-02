// JavaScript for dynamic date content
// This script populates the current year and last modified date in the footer

// Function to get the current year
function getCurrentYear() {
  const currentDate = new Date();
  return currentDate.getFullYear();
}

// Function to populate the current year in the footer
function populateCurrentYear() {
  const currentYearElement = document.getElementById("currentyear");
  if (currentYearElement) {
    currentYearElement.textContent = getCurrentYear();
  }
}

// Function to populate the last modified date
function populateLastModified() {
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.innerHTML = `Last modified: ${document.lastModified}`;
  }
}

// Execute functions when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  populateCurrentYear();
  populateLastModified();
});
