function getCurrentYear() {
  const currentDate = new Date();
  return currentDate.getFullYear();
}

function populateCurrentYear() {
  const currentYearElement = document.getElementById("currentyear");
  if (currentYearElement) {
    currentYearElement.textContent = getCurrentYear();
  }
}

function populateLastModified() {
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.innerHTML = `Last modified: ${document.lastModified}`;
  }
}

function setupHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", function () {
      navMenu.classList.toggle("show");

      if (navMenu.classList.contains("show")) {
        hamburgerBtn.innerHTML = "&#10005;";
        hamburgerBtn.setAttribute("aria-label", "Close menu");
      } else {
        hamburgerBtn.innerHTML = "&#9776;";
        hamburgerBtn.setAttribute("aria-label", "Open menu");
      }
    });
  }
}

function setupTempleFiltering() {
  const navLinks = document.querySelectorAll("nav a[data-filter]");
  const allLink = document.querySelector("nav a:not([data-filter])");
  const headerHome = document.getElementById("header-home");
  const templeCards = document.querySelectorAll(".temple-card");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const filter = this.getAttribute("data-filter");
      filterTemples(filter);
      updatePageTitle(filter);
      updateActiveLink(this);

      const navMenu = document.getElementById("nav-menu");
      const hamburgerBtn = document.getElementById("hamburger-btn");
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        hamburgerBtn.innerHTML = "&#9776;";
        hamburgerBtn.setAttribute("aria-label", "Open menu");
      }
    });
  });

  if (allLink) {
    allLink.addEventListener("click", function (e) {
      e.preventDefault();
      showAllTemples();
      updatePageTitle("home");
      updateActiveLink(this);

      const navMenu = document.getElementById("nav-menu");
      const hamburgerBtn = document.getElementById("hamburger-btn");
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        hamburgerBtn.innerHTML = "&#9776;";
        hamburgerBtn.setAttribute("aria-label", "Open menu");
      }
    });
  }

  if (headerHome) {
    headerHome.addEventListener("click", function (e) {
      e.preventDefault();
      showAllTemples();
      updatePageTitle("home");
      updateActiveLink(allLink);

      const navMenu = document.getElementById("nav-menu");
      const hamburgerBtn = document.getElementById("hamburger-btn");
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        hamburgerBtn.innerHTML = "&#9776;";
        hamburgerBtn.setAttribute("aria-label", "Open menu");
      }
    });
  }
}

function updatePageTitle(filter) {
  const pageTitle = document.querySelector("main h1");
  if (pageTitle) {
    switch (filter) {
      case "old":
        pageTitle.textContent = "Old Temples";
        break;
      case "new":
        pageTitle.textContent = "New Temples";
        break;
      case "large":
        pageTitle.textContent = "Large Temples";
        break;
      case "small":
        pageTitle.textContent = "Small Temples";
        break;
      default:
        pageTitle.textContent = "Sacred Temples";
    }
  }
}

function filterTemples(category) {
  const templeCards = document.querySelectorAll(".temple-card");

  templeCards.forEach((card) => {
    const categories = card.getAttribute("data-category").toLowerCase();

    if (categories.includes(category.toLowerCase())) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

function showAllTemples() {
  const templeCards = document.querySelectorAll(".temple-card");

  templeCards.forEach((card) => {
    card.classList.remove("hidden");
  });
}

function updateActiveLink(activeLink) {
  const allNavLinks = document.querySelectorAll("nav a");

  allNavLinks.forEach((link) => {
    link.classList.remove("active");
  });

  activeLink.classList.add("active");
}

function setupImageLoading() {
  const images = document.querySelectorAll(".temple-card img");

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  populateCurrentYear();
  populateLastModified();
  setupHamburgerMenu();
  setupTempleFiltering();
  setupImageLoading();

  const hamburgerBtn = document.getElementById("hamburger-btn");
  if (hamburgerBtn) {
    hamburgerBtn.setAttribute("aria-label", "Open menu");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("resize", function () {
  const navMenu = document.getElementById("nav-menu");
  const hamburgerBtn = document.getElementById("hamburger-btn");

  if (window.innerWidth >= 768) {
    if (navMenu) {
      navMenu.classList.remove("show");
    }
    if (hamburgerBtn) {
      hamburgerBtn.innerHTML = "&#9776;";
      hamburgerBtn.setAttribute("aria-label", "Open menu");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    }
  }
});
