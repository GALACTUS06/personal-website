const demoLaunch = document.querySelector("[data-demo-play]");
const demoVideo = document.querySelector(".demo__video");
const demoError = document.querySelector(".demo__error");

if (demoLaunch && demoVideo && demoError && demoVideo.canPlayType("video/mp4")) {
  demoVideo.addEventListener("error", () => {
    demoError.hidden = false;
  });

  demoLaunch.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    demoVideo.src = demoLaunch.href;
    demoVideo.hidden = false;
    demoLaunch.hidden = true;
    demoVideo.focus({ preventScroll: true });
    demoVideo.play().catch(() => {
      if (demoVideo.error) demoError.hidden = false;
    });
  });
}
