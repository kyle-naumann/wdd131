// JavaScript for Place page - Yellowstone National Park
// Static weather values for Yellowstone
const temperature = 45; // °F
const windSpeed = 8; // mph

/**
 * Calculate windchill factor using Imperial formula for Fahrenheit
 * Formula: 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16)
 * Where T = temperature in Fahrenheit, V = wind speed in mph
 * @param {number} temp - Temperature in Fahrenheit
 * @param {number} wind - Wind speed in mph
 * @returns {number} - Windchill factor rounded to nearest whole number
 */
function calculateWindChill(temp, wind) {
  return Math.round(
    35.74 +
      0.6215 * temp -
      35.75 * Math.pow(wind, 0.16) +
      0.4275 * temp * Math.pow(wind, 0.16)
  );
}

/**
 * Display windchill factor if conditions are met
 * Conditions for Imperial: Temperature <= 50°F AND Wind speed > 3 mph
 */
function displayWindChill() {
  const windChillElement = document.getElementById("windchill");

  if (!windChillElement) {
    console.error("Wind chill element not found");
    return;
  }

  // Check if conditions are met for viable windchill calculation (imperial)
  if (temperature <= 50 && windSpeed > 3) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `${windChill}°F`;
  } else {
    windChillElement.textContent = "N/A";
  }
}

/**
 * Get the current year for copyright
 * @returns {number} - Current year
 */
function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Populate the current year in footer
 */
function populateCurrentYear() {
  const currentYearElement = document.getElementById("currentyear");
  if (currentYearElement) {
    currentYearElement.textContent = getCurrentYear();
  }
}

/**
 * Populate the last modified date in footer
 */
function populateLastModified() {
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.innerHTML = `Last Modification: ${document.lastModified}`;
  }
}

/**
 * Initialize all dynamic content when DOM is loaded
 */
function initializePage() {
  // Display static weather values
  const tempElement = document.getElementById("temperature");
  const windElement = document.getElementById("windspeed");

  if (tempElement) tempElement.textContent = `${temperature}°F`;
  if (windElement) windElement.textContent = `${windSpeed} mph`;

  // Calculate and display windchill
  displayWindChill();

  // Populate footer information
  populateCurrentYear();
  populateLastModified();

  // Log successful initialization
  console.log("Yellowstone place page initialized successfully");
  console.log(`Weather conditions: ${temperature}°F, ${windSpeed} mph`);
  console.log(
    `Windchill calculation conditions met: ${
      temperature <= 50 && windSpeed > 3
    }`
  );
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", initializePage);
