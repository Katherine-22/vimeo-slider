const swiper = new Swiper(".swiper", {
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const popup = document.querySelector(".popup");
const iframeHolder = document.querySelector(".iframeHolder");
const slides = document.querySelectorAll(".swiper-slide");
const closeBtn = document.querySelector(".close-btn");

let url = `https://vimeo.com/api/oembed.json?url=https://player.vimeo.com/video/824804225`;

axios
  .get(url)
  .then((response) => {
    updateSlider(response.data);
  })
  .catch((err) => {
    console.error(err);
  });

function updateSlider(res) {
  slides.forEach((slide) => {
    slide.querySelector("img").src = `${res.thumbnail_url}`;

    slide.addEventListener("click", () => {
      let iframe = res.html;
      iframeHolder.innerHTML = iframe;
      let popVideo = iframeHolder.querySelector("iframe");
      popup.classList.add("active");

      let player = new Vimeo.Player(popVideo);
      player.play();
    });
  });
}

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
  let popVideo = iframeHolder.querySelector("iframe");
  let player = new Vimeo.Player(popVideo);
  player.pause();
});
