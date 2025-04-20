window.onload = function () {
  // Get about data
  fetch("/portfolio/data/homeabout.json")
    .then((response) => response.json())
    .then((data) => {
      new Typed(".typing", {
        strings: data.typinglist,
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
      });

      // About info on about page
      const aboutinfo = document.getElementById("aboutinfo");
      aboutinfo.innerHTML = `
      <div class="info-item padd-15">
        <p>Status: <span>${data.status}</span></p>
      </div>
      <div class="info-item padd-15">
        <p>Email: <span>${data.email}</span></p>
      </div>
      <div class="info-item padd-15">
        <p>Degree: <span>${data.degree}</span></p>
      </div>
      <!--
      <div class="info-item padd-15">
        <p>Phone: <span>${data.phone}</span></p>
      </div>
      -->
      <div class="info-item padd-15">
        <p>Hometown: <span>${data.hometown}</span></p>
      </div>
      <div class="info-item padd-15">
        <p>Website: <span>${data.website}</span></p>
      </div>
      `;

      // Get education data
      fetch("/portfolio/data/education.json")
        .then((response) => response.json())
        .then((data) => {
          const timeline = document.getElementById("education");
          data.forEach((item) => {
            const timelineItem = document.createElement("div");
            timelineItem.className = "timeline-item";
            timelineItem.innerHTML = `
          <div class="circle-dot"></div>
          <h3 class="timeline-date">
            <i class="fa fa-calendar"></i> ${item.date}
          </h3>
          <h4 class="timeline-title">${item.title}</h4>
          <p class="timeline-text">${item.score}%</p>
        `;
            timeline.appendChild(timelineItem);
          });
        })
        .catch((error) =>
          console.error("Error loading education data:", error)
        );
      // About detailed info on about page
      const detailedBio = document.getElementById("abttxt");
      detailedBio.innerHTML = `
      <h3>
        I'm ${data.name}, <span>${data.designation}</span>
      </h3>
      <p>
      ${data.detailedBio}
      </p>
      `;

      // contactinfo on contact page
      const contactinfo = document.getElementById("contactinfo");
      contactinfo.innerHTML = `
      <!-- 
      <div class="contact-info-item padd-15">
        <div class="icon">
          <i class="fa fa-phone"></i>
          <h4>Call Me On</h4>
          <p>${data.phone}</p>
        </div> 
      </div>
        -->

      <!-- Contact info item end -->
      <!-- Contact info item start -->
      <div class="contact-info-item padd-15">
        <div class="icon">
          <i class="fa fa-map-marker-alt"></i>
          <h4>Hometown</h4>
          <p>${data.hometown}</p>
        </div>
      </div>
      <!-- Contact info item end -->
      <!-- Contact info item start -->
      <div class="contact-info-item padd-15">
        <div class="icon">
          <i class="fa fa-envelope"></i>
          <h4>Email</h4>
          <p>${data.email}</p>
        </div>
      </div>
      <!-- Contact info item end -->
      <!-- Contact info item start -->
      <div class="contact-info-item padd-15">
        <div class="icon">
          <i class="fa fa-globe-europe"></i>
          <h4>Website</h4>
          <p>${data.website}</p>
        </div>
      </div>
      `;
    })
    .catch((error) => console.error("Error loading about data:", error));

  // Get skills data
  fetch("/portfolio/data/skills.json")
    .then((response) => response.json())
    .then((data) => {
      const skillsContainer = document.getElementById("skill-list");

      data.skills.forEach((item) => {
        const li = document.createElement("li");
        li.className = "shadow-dark";
        li.textContent = item;
        skillsContainer.appendChild(li);
      });
    })
    .catch((error) => console.error("Error loading skills data:", error));

  // Get Certifications data
  fetch("/portfolio/data/certifications.json")
    .then((response) => response.json())
    .then((data) => {
      const certifications = document.getElementById("cert-list");
      data.certifications.forEach((item) => {
        certifications.innerHTML += `
        <div class="certifications-item padd-15">
          <div class="certifications-item-inner">
            <h2>${item.title}</h2>
            <h4 class="validity"><i class="fa fa-calendar"></i> ${item.validity}</h4>
            <p>
              <img
                src=${item.url}
                alt=""
                width="100%"
              />
            </p>
          </div>
        </div>
        `;
      });
      attachCertificationModalListeners();
    })
    .catch((error) => console.error("Error loading education data:", error));

  // Get experience data from experience files
  const files = ["1.html"];

  const experienceElement = document.getElementById("experience");

  Promise.all(
    files.map((file) =>
      fetch(`/portfolio/data/experience/${file}`).then((res) => res.text())
    )
  ).then((allData) => {
    experienceElement.innerHTML = allData.join("");
  });
};

// smooth scroll navigation click animation
document.querySelectorAll(".nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove 'active' class from all nav links
    document
      .querySelectorAll(".nav a")
      .forEach((link) => link.classList.remove("active"));

    // Add 'active' class to the clicked nav link
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

// Certificate modal form
attachCertificationModalListeners = function () {
  // Get modal elements
  const modal = document.getElementById("certificationModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImg = document.getElementById("modalImg");
  const modalDescription = document.getElementById("modalDescription");
  const closeModal = document.getElementById("closeModal");

  // Attach click event to each certification item
  document
    .querySelectorAll(".certifications-item-inner")
    .forEach(function (item) {
      item.addEventListener("click", function () {
        // Set modal title from the h2 of the clicked item
        modalTitle.innerText = item.querySelector("h2").innerText;

        // Set modal image based on the first image found
        const imgEl = item.querySelector("img");
        if (imgEl) {
          modalImg.src = imgEl.src;
          modalImg.alt = imgEl.alt;
        }

        // Optionally, you can update the description or add additional info
        modalDescription.innerText = item.querySelector(".validity").innerText;

        // Open the modal
        modal.style.display = "block";
      });
    });

  // Event listener to close modal when close button is clicked
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Optionally, close modal when user clicks outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
};
