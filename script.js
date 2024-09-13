const cursorOutline = document.querySelector(".cursor-outline");

const mouse = { x: 0, y: 0 };
const previousMouse = { x: 0, y: 0 };
const circle = { x: 0, y: 0 };
let currentScale = 0;
let currentAngle = 0;

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

const speed = 0.17;

const tick = () => {
    // Smoothly move the circle towards the mouse
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;

    // Apply translation
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

    // Calculate velocity for the scaling effect
    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;

    const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
    const scaleValue = (mouseVelocity / 150) * 0.5;

    // Smoothly interpolate the scaling value
    currentScale += (scaleValue - currentScale) * speed;
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

    // Rotate
    const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
    const rotateTransform = `rotate(${angle}deg)`

    if (mouseVelocity > 20){
        currentAngle = angle;
    }

    // Apply the transformation to the cursor element
    cursorOutline.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

    // Request the next animation frame
    window.requestAnimationFrame(tick);
};

// Start the animation loop
tick();
