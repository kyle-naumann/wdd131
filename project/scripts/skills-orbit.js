const skills = [
  {
    name: "React",
    color: "#61DAFB",
    description: "Building interactive UIs with components",
    experience: "3+ years",
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    description: "Modern ES6+ development",
    experience: "4+ years",
  },
  {
    name: "Python",
    color: "#3776AB",
    description: "Backend development & data analysis",
    experience: "3+ years",
  },
  {
    name: "CSS",
    color: "#9C27B0",
    description: "Responsive design & animations",
    experience: "4+ years",
  },
  {
    name: "Figma",
    color: "#F24E1E",
    description: "UI/UX design & prototyping",
    experience: "2+ years",
  },
  {
    name: "Node.js",
    color: "#339933",
    description: "Server-side JavaScript development",
    experience: "2+ years",
  },
  {
    name: "Photoshop",
    color: "#31A8FF",
    description: "Photo editing & digital art creation",
    experience: "3+ years",
  },
  {
    name: "Illustrator",
    color: "#FF9A00",
    description: "Vector graphics & logo design",
    experience: "2+ years",
  },
];

function createSkillsOrbit() {
  const container = document.getElementById("skillsOrbit");
  if (!container) return;

  skills.forEach((skill, index) => {
    // Create skill circle
    const skillElement = document.createElement("div");
    skillElement.className = "skill-circle";
    skillElement.innerHTML = `
      <div class="skill-icon" style="background-color: ${skill.color}">
        ${skill.name}
      </div>
      <div class="skill-details">
        <h4>${skill.name}</h4>
        <p>${skill.description}</p>
        <span class="experience">${skill.experience}</span>
      </div>
    `;

    // Set orbit angle
    const angle = (360 / skills.length) * index;
    skillElement.style.setProperty("--start-angle", `${angle}deg`);

    // Position detail card away from center based on angle
    const detailCard = skillElement.querySelector(".skill-details");
    const radians = (angle * Math.PI) / 180;
    const orbitRadius = 210; // Match CSS translateX value
    const cardDistance = 140; // Additional distance from skill icon to card

    // Calculate the skill's position on the orbit
    const skillX = Math.cos(radians) * orbitRadius;
    const skillY = Math.sin(radians) * orbitRadius;

    // Position card further away from center
    const totalDistance = orbitRadius + cardDistance;
    const cardX = Math.cos(radians) * cardDistance;
    const cardY = Math.sin(radians) * cardDistance;

    detailCard.style.left = `${cardX}px`;
    detailCard.style.top = `${cardY}px`;
    detailCard.style.transform = "translate(-50%, -50%)";

    container.appendChild(skillElement);
  });
}

function createSkillsCards() {
  const skillsGrid = document.getElementById("skillsGrid");
  if (!skillsGrid) return;

  skills.forEach((skill) => {
    const cardElement = document.createElement("div");
    cardElement.className = "skill-card";
    cardElement.style.setProperty("--skill-color", skill.color);

    cardElement.innerHTML = `
      <div class="skill-card-header">
        <div class="skill-card-icon" style="background: ${skill.color}">
          ${skill.name.charAt(0)}
        </div>
        <h3 class="skill-card-title">${skill.name}</h3>
      </div>
      <p class="skill-card-description">${skill.description}</p>
      <span class="skill-card-experience">${skill.experience}</span>
    `;

    skillsGrid.appendChild(cardElement);
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  createSkillsOrbit();
  createSkillsCards();
});
