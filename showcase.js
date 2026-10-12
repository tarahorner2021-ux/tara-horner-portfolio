(() => {
  "use strict";

  /* Click any image in a .shot to open it full size. Esc, a click, or the
     close button dismisses it. */
  const lb = document.createElement("div");
  lb.className = "lb";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Image preview");
  lb.innerHTML = '<button class="lb-close" aria-label="Close preview">&times;</button><img alt="" />';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img");
  let lastFocus = null;

  const close = () => {
    lb.classList.remove("is-open");
    if (lastFocus) lastFocus.focus();
  };
  const open = (img) => {
    lastFocus = img;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || "";
    lb.classList.add("is-open");
    lb.querySelector(".lb-close").focus();
  };

  document.querySelectorAll(".shot img").forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.addEventListener("click", () => open(img));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(img); }
    });
  });
  lb.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
})();
