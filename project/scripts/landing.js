document.addEventListener("DOMContentLoaded", function () {
  // Portfolio data with arrays and objects
  const portfolioProjects = [
    {
      id: "temples",
      title: "Temple",
      description: "Responsive website showcasing temple information",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive"],
      url: "../temples.html",
      featured: true,
    },
    {
      id: "place",
      title: "Yellowstone",
      description: "Interactive page with location information",
      technologies: ["HTML5", "CSS3", "Web Standards", "Accessibility"],
      url: "../place.html",
      featured: false,
    },
    {
      id: "forms",
      title: "Form",
      description: "Complete form system with validation",
      technologies: ["Forms", "JavaScript", "LocalStorage", "Validation"],
      url: "../form.html",
      featured: true,
    },
  ];

  const navLinks = document.querySelectorAll(".main-nav a");
  const socialIcons = document.querySelectorAll(".social-icon");

  function filterProjectsByTechnology(tech) {
    // Array method with conditional logic
    return portfolioProjects.filter((project) => {
      if (tech === "all") return true;
      return project.technologies.some((t) =>
        t.toLowerCase().includes(tech.toLowerCase()),
      );
    });
  }

  function getFeaturedProjects() {
    // Array method to get featured projects
    return portfolioProjects.filter((project) => project.featured);
  }

  function generateProjectHTML(project) {
    // Template literal for project generation
    const tagsHTML = project.technologies
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");

    // Use actual project images
    let imageSrc;
    if (project.id === "temples") {
      imageSrc = "../images/brigham-temple.jpg";
    } else if (project.id === "place") {
      imageSrc = "../images/yellowstone-medium.webp";
    } else {
      imageSrc = "../images/web-development.jpg";
    }

    return `
      <div class="portfolio-item" data-project-id="${project.id}" data-project-url="${project.url}" style="cursor: pointer;">
        <div class="portfolio-image">
          <img src="${imageSrc}" alt="${project.title}" loading="lazy">
        </div>
        <div class="portfolio-content">
          <h3>${project.title}</h3>
          <div class="portfolio-actions">
            <a href="${project.url}" class="portfolio-link" target="_blank">View Project →</a>
          </div>
          <p>${project.description}</p>
          <div class="portfolio-tags">
            ${tagsHTML}
          </div>
        </div>
      </div>
    `;
  }

  function initializePortfolioPage() {
    const portfolioGrid = document.querySelector(".portfolio-grid");

    // Conditional check if we're on portfolio page
    if (portfolioGrid) {
      // Generate all projects using array methods and template literals
      const projectsHTML = portfolioProjects
        .map((project) => generateProjectHTML(project))
        .join("");
      portfolioGrid.innerHTML = projectsHTML;

      // Add filter functionality
      addProjectFilters();

      // Add click event listeners to portfolio cards
      addPortfolioCardListeners();
    }
  }

  function addPortfolioCardListeners() {
    const portfolioCards = document.querySelectorAll(".portfolio-item");
    portfolioCards.forEach((card) => {
      card.addEventListener("click", function (e) {
        // Don't navigate if clicking on buttons or links
        if (
          e.target.closest(".portfolio-link") ||
          e.target.closest(".favorite-btn")
        ) {
          return;
        }

        const projectUrl = this.dataset.projectUrl;
        if (projectUrl) {
          window.open(projectUrl, "_blank");
        }
      });
    });
  }

  function addProjectFilters() {
    // Create filter buttons if not exists
    const portfolioSection = document.querySelector(".portfolio-section");
    if (portfolioSection && !document.querySelector(".filter-buttons")) {
      const filterHTML = `
        <div class="filter-buttons">
          <button class="filter-btn active" data-filter="all">All Projects</button>
          <button class="filter-btn" data-filter="javascript">JavaScript</button>
          <button class="filter-btn" data-filter="html5">HTML5</button>
          <button class="filter-btn" data-filter="forms">Forms</button>
        </div>
      `;
      const pageTitle = portfolioSection.querySelector(".page-title");
      pageTitle.insertAdjacentHTML("afterend", filterHTML);

      // Add event listeners to filter buttons
      const filterBtns = document.querySelectorAll(".filter-btn");
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const filter = this.dataset.filter;
          filterProjects(filter);

          // Update active button
          filterBtns.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
        });
      });
    }
  }

  function filterProjects(filter) {
    const filteredProjects = filterProjectsByTechnology(filter);
    const portfolioGrid = document.querySelector(".portfolio-grid");

    if (portfolioGrid) {
      const projectsHTML = filteredProjects
        .map((project) => generateProjectHTML(project))
        .join("");
      portfolioGrid.innerHTML = projectsHTML;

      // Re-add click event listeners after filtering
      addPortfolioCardListeners();
    }
  }

  function initializeContactForm() {
    const contactForm = document.getElementById("contactForm");

    // Conditional check if contact form exists
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        handleFormSubmission(this);
      });

      // Load saved form data if available
      loadSavedFormData();
    }
  }

  function handleFormSubmission(form) {
    const formData = {
      name: form.name.value,
      email: form.email.value,
      project: form.project.value,
      message: form.message.value,
      timestamp: new Date().toISOString(),
    };

    // Conditional validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Save form submissions using arrays and localStorage
    const submissions =
      JSON.parse(localStorage.getItem("formSubmissions")) || [];
    submissions.push(formData);
    localStorage.setItem("formSubmissions", JSON.stringify(submissions));

    // Show success message using template literals
    const successMessage = `
      <div class="success-message">
        <h3>Thank you, ${formData.name}!</h3>
        <p>Your message has been received. I'll get back to you soon!</p>
      </div>
    `;

    form.innerHTML = successMessage;

    console.log(`Form submitted by ${formData.name} at ${formData.timestamp}`);
  }

  function loadSavedFormData() {
    // Check if user has previous submission data
    const submissions =
      JSON.parse(localStorage.getItem("formSubmissions")) || [];

    if (submissions.length > 0) {
      const lastSubmission = submissions[submissions.length - 1];
      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");

      // Pre-fill name and email from last submission
      if (nameField && emailField) {
        nameField.value = lastSubmission.name;
        emailField.value = lastSubmission.email;
      }
    }
  }

  function initializeAnimations() {
    const heroTitle = document.querySelectorAll(".hero-title");
    const heroDescription = document.querySelectorAll(".hero-description");

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    [...heroTitle, ...heroDescription].forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(element);
    });
  }

  function initializeProfileImage() {
    const paintOverlay = document.querySelector(".paint-overlay");

    if (paintOverlay) {
      // Add global mouse move listener for paint overlay tilt effect
      document.addEventListener("mousemove", function (e) {
        const x = e.clientX;
        const y = e.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const rotateX = ((y - centerY) / centerY) * -25;
        const rotateY = ((x - centerX) / centerX) * 25;
        const translateX = ((x - centerX) / centerX) * 15;
        const translateY = ((y - centerY) / centerY) * 15;

        paintOverlay.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    }
  }

  function loadCodeContent() {
    const codeContainer = document.querySelector(".scrolling-code");
    if (codeContainer && typeof codeScrollContent !== "undefined") {
      // Generate the code lines HTML
      const codeHTML = codeScrollContent
        .map((line) => {
          const indentClass = line.indent ? ` ${line.indent}` : "";
          return `<span class="code-line${indentClass}">${line.content}</span>`;
        })
        .join("");

      // Duplicate the content for seamless loop
      codeContainer.innerHTML = codeHTML + codeHTML;
    }
  }

  function loadDesignElements() {
    const designContainer = document.querySelector(".design-elements");
    if (designContainer && typeof designElements !== "undefined") {
      // Generate the design elements HTML
      const elementsHTML = designElements
        .map((element) => {
          return `<div class="${element.class}"></div>`;
        })
        .join("");

      designContainer.innerHTML = elementsHTML;
    }
  }

  function initializeCodeAnimation() {
    const codeLines = document.querySelectorAll(".code-line");

    codeLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.opacity = "1";
        line.style.transform = "translateX(0)";
      }, index * 200);

      line.style.opacity = "0";
      line.style.transform = "translateX(-20px)";
      line.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    });
  }

  function handleScroll() {
    const header = document.querySelector(".main-header");
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
      header.style.backgroundColor = "rgba(26, 26, 26, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.backgroundColor = "var(--primary-dark)";
      header.style.backdropFilter = "none";
    }
  }

  function initializeNavigation() {
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Only prevent default for anchor links (starting with #)
        if (this.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
        // For other links (about.html, portfolio.html), let them navigate normally
      });
    });
  }

  // Initialize all functionality
  loadCodeContent();
  loadDesignElements();
  initializeNavigation();
  initializeAnimations();
  initializeProfileImage();
  initializePortfolioPage();
  initializeContactForm();

  setTimeout(() => {
    initializeCodeAnimation();
  }, 1000);

  window.addEventListener("scroll", handleScroll);

  const logoIcon = document.querySelector(".logo-icon");
  if (logoIcon) {
    logoIcon.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  console.log("Landing page initialized successfully");
});
