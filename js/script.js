/* =========================================
   MADHYAM GROUP
   MAIN INTERACTION SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const wings = document.querySelectorAll(".wing");
    const globe = document.querySelector(".globe-wrapper");
    const brand = document.querySelector(".brand-center");


    /* =====================================
       WING HOVER
    ===================================== */

    wings.forEach((wing) => {

        wing.addEventListener("mouseenter", () => {

            wings.forEach((otherWing) => {

                if (otherWing !== wing) {
                    otherWing.style.opacity = "0.35";
                }

            });

            if (globe) {
                globe.style.opacity = "0.45";
            }

            if (brand) {
                brand.style.opacity = "0.45";
            }

        });


        wing.addEventListener("mouseleave", () => {

            wings.forEach((otherWing) => {
                otherWing.style.opacity = "";
            });

            if (globe) {
                globe.style.opacity = "";
            }

            if (brand) {
                brand.style.opacity = "";
            }

        });

    });


    /* =====================================
       SUBTLE GLOBE ROTATION
    ===================================== */

    let rotation = 0;

    function animateGlobe() {

        rotation += 0.015;

        if (globe) {
            globe.style.transform =
                `translate(-50%, -50%) rotate(${rotation}deg)`;
        }

        requestAnimationFrame(animateGlobe);
    }

    animateGlobe();


    /* =====================================
       PREVENT EMPTY LINKS
    ===================================== */

    wings.forEach((wing) => {

        wing.addEventListener("click", (event) => {

            const target = wing.getAttribute("href");

            if (!target || target === "#") {

                event.preventDefault();

                console.log(
                    "Madhyam Wing:",
                    wing.querySelector("h2")?.textContent
                );

            }

        });

    });

});
