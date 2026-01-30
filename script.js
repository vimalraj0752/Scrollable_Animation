const canvas = document.getElementById("animation");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index =>
  `images/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

canvas.width = 1920;
canvas.height = 1080;

const images = [];
let img = new Image();
img.src = currentFrame(1);
images.push(img);

// Preload images
for (let i = 2; i <= frameCount; i++) {
  const image = new Image();
  image.src = currentFrame(i);
  images.push(image);
}

// Draw image
function drawImage(index) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
}

// Scroll handler
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScrollTop =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => drawImage(frameIndex));
});

// Initial render
images[0].onload = () => {
  drawImage(0);
};

