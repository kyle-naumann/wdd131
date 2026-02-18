const skillsData = [
  { name: "React", category: "frontend", color: "#61DAFB" },
  { name: "JavaScript", category: "frontend", color: "#F7DF1E" },
  { name: "Python", category: "backend", color: "#3776AB" },
  { name: "Node.js", category: "backend", color: "#339933" },
  { name: "HTML5", category: "frontend", color: "#E34F26" },
  { name: "CSS3", category: "frontend", color: "#1572B6" },
  { name: "Figma", category: "design", color: "#F24E1E" },
  { name: "Photoshop", category: "design", color: "#31A8FF" },
  { name: "Illustrator", category: "design", color: "#FF9A00" },
  { name: "UI/UX", category: "design", color: "#9C27B0" },
  { name: "MongoDB", category: "database", color: "#47A248" },
  { name: "Express", category: "backend", color: "#000000" },
  { name: "Git", category: "tools", color: "#F05032" },
  { name: "TypeScript", category: "frontend", color: "#3178C6" },
  { name: "Design Systems", category: "design", color: "#FF6B35" },
  { name: "REST APIs", category: "backend", color: "#00BCD4" },
];

function createMindMap() {
  const container = document.getElementById("mindmapContainer");
  console.log("Container found:", container); // Debug log
  if (!container) {
    console.log("No mindmapContainer found!");
    return;
  }

  // Create the entire mind map structure
  container.innerHTML = `
    <div class="mindmap-container">
      <div class="mindmap-center">
        <div class="center-node">Skills</div>
      </div>
      <div class="mindmap-nodes" id="mindmapNodes"></div>
    </div>
  `;

  const nodesContainer = document.getElementById("mindmapNodes");
  const containerWidth = 800; // Fixed container width
  const containerHeight = 600; // Fixed container height
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  skillsData.forEach((skill, index) => {
    // Create skill node (text only)
    const node = document.createElement("div");
    node.className = "skill-node";
    node.textContent = skill.name;

    // Set font size based on skill size (depth effect)
    const fontSize = 0.8 + skill.size * 0.6; // Range from ~0.8rem to ~1.4rem
    node.style.fontSize = `${fontSize}rem`;

    // Position at center initially
    node.style.left = `${centerX}px`;
    node.style.top = `${centerY}px`;
    node.style.transformOrigin = `${centerX}px ${centerY}px`;

    // Set orbit radius based on size (larger = closer = smaller orbit)
    const orbitRadius = 140 + 50 * (1 - skill.size); // Range from ~140px to ~190px
    node.style.setProperty("--orbit-radius", `${orbitRadius}px`);
    node.style.setProperty("--skill-size", skill.size);

    // Alternate between clockwise and counterclockwise
    const isReverse = index % 2 === 0;
    const animationDuration = (20 + (index % 3) * 5) * 2; // Slower animations
    const animationDelay = index * 2; // Stagger start times

    if (isReverse) {
      node.style.animation = `skillFloatReverse ${animationDuration}s linear ${animationDelay}s infinite`;
    } else {
      node.style.animation = `skillFloat ${animationDuration}s linear ${animationDelay}s infinite`;
    }

    nodesContainer.appendChild(node);
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(createMindMap, 500); // Small delay to ensure styles are loaded
});
