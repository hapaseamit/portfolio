document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [aboutRes, educationRes, skillsRes, certificationsRes] =
      await Promise.all([
        fetch("data/homeabout.json"),
        fetch("data/education.json"),
        fetch("data/skills.json"),
        fetch("data/certifications.json"),
      ]);

    const aboutData = await aboutRes.json();
    const educationData = await educationRes.json();
    const skillsData = await skillsRes.json();
    const certData = await certificationsRes.json();

    new Typed(".typing", {
      strings: aboutData.typinglist,
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
      cursorChar: "",
    });

    const aboutinfo = document.getElementById("aboutinfo");
    if (aboutinfo) {
      aboutinfo.innerHTML = `
        <div class="info-item padd-15">
          <p>Status: <span>${aboutData.status}</span></p>
        </div>
        <div class="info-item padd-15">
          <p>Email: <span>${aboutData.email}</span></p>
        </div>
        <div class="info-item padd-15">
          <p>Degree: <span>${aboutData.degree}</span></p>
        </div>
        <div class="info-item padd-15">
          <p>Hometown: <span>${aboutData.hometown}</span></p>
        </div>
        <div class="info-item padd-15">
          <p>Website: <span>${aboutData.website}</span></p>
        </div>
      `;
    }

    const detailedBio = document.getElementById("abttxt");
    if (detailedBio) {
      detailedBio.innerHTML = `
        <h3>I'm ${aboutData.name}, <span>${aboutData.designation}</span></h3>
        <p>${aboutData.detailedBio}</p>
      `;
    }

    const contactinfo = document.getElementById("contactinfo");
    if (contactinfo) {
      contactinfo.innerHTML = `
        <div class="contact-info-item padd-15">
          <div class="icon"><i class="fa fa-map-marker-alt"></i></div>
          <h4>Hometown</h4>
          <p>${aboutData.hometown}</p>
        </div>
        <div class="contact-info-item padd-15">
          <div class="icon"><i class="fa fa-envelope"></i></div>
          <h4>Email</h4>
          <p>${aboutData.email}</p>
        </div>
        <div class="contact-info-item padd-15">
          <div class="icon"><i class="fa fa-globe-europe"></i></div>
          <h4>Website</h4>
          <p>${aboutData.website}</p>
        </div>
      `;
    }

    const timeline = document.getElementById("education");
    if (timeline) {
      educationData.forEach((item) => {
        const timelineItem = document.createElement("div");
        timelineItem.className = "timeline-item";
        timelineItem.innerHTML = `
          <div class="circle-dot"></div>
          <h3 class="timeline-date"><i class="fa fa-calendar"></i> ${item.date}</h3>
          <h4 class="timeline-title">${item.title}</h4>
          <p class="timeline-text">${item.score}%</p>
        `;
        timeline.appendChild(timelineItem);
      });
    }

    const skillsContainer = document.getElementById("skill-list");
    if (skillsContainer) {
      skillsData.skills.forEach((item) => {
        const li = document.createElement("li");
        li.className = "shadow-dark";
        li.textContent = item;
        skillsContainer.appendChild(li);
      });
    }

    const certifications = document.getElementById("cert-list");
    if (certifications) {
      certData.certifications.forEach((item) => {
        certifications.innerHTML += `
          <div class="certifications-item padd-15">
            <div class="certifications-item-inner shadow-dark">
              <h2>${item.title}</h2>
              <h4 class="validity hidden"><i class="fa fa-calendar"></i> ${item.validity}</h4>
              <p>
                <img src="${encodeURIComponent(item.url)}" alt="${item.title}" width="100%" loading="lazy" />
              </p>
            </div>
          </div>
        `;
      });
      attachCertificationModalListeners();
    }
  } catch (error) {
    console.error("Error loading portfolio data:", error);
  }

  document.querySelectorAll(".nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove 'active' class from all nav links
      document
        .querySelectorAll(".nav a")
        .forEach((link) => link.classList.remove("active"));

      this.classList.add("active");

      // Smooth scroll to the target section
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

const attachCertificationModalListeners = () => {
  const modal = document.getElementById("certificationModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImg = document.getElementById("modalImg");
  const modalDescription = document.getElementById("modalDescription");
  const closeModal = document.getElementById("closeModal");

  if (!modal) return; // Guard clause in case modal is missing

  document.querySelectorAll(".certifications-item-inner").forEach((item) => {
    item.addEventListener("click", () => {
      modalTitle.innerText = item.querySelector("h2").innerText;

      const imgEl = item.querySelector("img");
      if (imgEl) {
        modalImg.src = imgEl.src;
        modalImg.alt = imgEl.alt;
      }

      const validityEl = item.querySelector(".validity");
      if (validityEl) {
        modalDescription.innerText = validityEl.innerText;
      }

      modal.style.display = "block";
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
