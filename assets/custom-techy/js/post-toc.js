var navHeight = 0;
var postHeader = 0;

// original version taken from: https://ghostfam.com/en/create-a-table-of-contents-for-ghost/
// Function to initialize the table of contents for posts/pages
function initializeToC() {
  navHeight = document
    .querySelector(".gh-navigation")
    .getBoundingClientRect().height;

  const header = document.querySelector(".gh-article-title");
  postHeader = header.getBoundingClientRect().height;
  const style = window.getComputedStyle(header);
  const marginTop = parseInt(style.marginTop);
  const marginBottom = parseInt(style.marginBottom);
  postHeader += marginTop + marginBottom;

  const contentElement = document.querySelector(".gh-content");
  contentElement.id = "start";
  if (contentElement) {
    const asideElement = document.createElement("aside");
    asideElement.className = "gh-sidebar";
    asideElement.innerHTML = `
    <div id="gh-mobile-toc">
      <div class="toc-hamburger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
    <div class="gh-toc" id="gh-toc"></div>`;
    const firstChildElement = contentElement.firstElementChild;
    if (firstChildElement) {
      firstChildElement.insertAdjacentElement("beforebegin", asideElement);
    } else {
      contentElement.appendChild(asideElement);
    }

    const extraHeadingElement = document.querySelector(".gh-article-title");
    if (extraHeadingElement) {
      const extraHeadingText = extraHeadingElement.textContent;
      const hiddenTitle = document.createElement("h2");
      hiddenTitle.id = "start";
      hiddenTitle.textContent = extraHeadingText;
      hiddenTitle.style.display = "none";
      contentElement.prepend(hiddenTitle);
    }

    tocbot.init({
      tocSelector: ".gh-toc",
      contentSelector: ".gh-content",
      headingSelector: "h1,h2,h3,h4",
      hasInnerContainers: true,
      scrollSmoothOffset: -100,
      headingsOffset: 100,
    });

    // toggle the sidebar when the hamburger is clicked
    document.getElementById("gh-mobile-toc").addEventListener("click", () => {
      const sidebar = document.querySelector(".gh-sidebar");
      sidebar.classList.toggle("fixed");
    });

    // hide the sidebar when a link is clicked
    document.querySelectorAll(".toc-link").forEach((link) => {
      link.addEventListener("click", () => {
        const sidebar = document.querySelector(".gh-sidebar");
        if (sidebar.classList.contains("fixed")) {
          sidebar.classList.remove("fixed");
        }
      });
    });

    updateHamburgerDisplay();
  }
}

function updateHamburgerDisplay() {
  const sidebar = document.querySelector(".gh-sidebar");
  const sidebarBox = sidebar.getBoundingClientRect();
  const mobileToc = document.getElementById("gh-mobile-toc");
  const size = navHeight + postHeader + sidebarBox.height;

  if (window.scrollY > size) {
    mobileToc.classList.add("displayed");
  } else {
    mobileToc.classList.remove("displayed");

    // Remove the fixed sidebar when the user scrolls back up
    if (sidebar.classList.contains("fixed")) {
      sidebar.classList.remove("fixed");
    }
  }
}

document.addEventListener("scroll", updateHamburgerDisplay);
document.addEventListener("DOMContentLoaded", initializeToC);
