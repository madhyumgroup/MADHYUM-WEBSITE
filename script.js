/* =========================================
   MADHYUM GROUP
   WEBSITE INTERACTIONS
========================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       NAVBAR SCROLL EFFECT
    ===================================== */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

        });

    }


    /* Close mobile menu after clicking */

    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    });


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, .wing-card, .flow-card, .partner-box, .step, .form-card, .membership-card"
    );

    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function (element) {

        observer.observe(element);

    });


    /* =====================================
       CURRENT YEAR
    ===================================== */

    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }


    /* =====================================
       REQUIREMENT FORM
    ===================================== */

    const form = document.getElementById("requirementForm");
    const formMessage = document.getElementById("formMessage");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const requirement =
                document.getElementById("requirementType").value;

            if (!name || !phone || !requirement) {

                formMessage.style.display = "block";

                formMessage.textContent =
                    "Please enter your name, phone number and requirement.";

                return;

            }


            formMessage.style.display = "block";

            formMessage.textContent =
                "Thank you, " +
                name +
                ". Your requirement has been recorded. The MADHYUM enquiry system can be connected to WhatsApp, email or CRM in the next stage.";

            form.reset();

        });

    }


    /* =====================================
       SMOOTH ANCHOR SCROLLING
    ===================================== */

    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(function (anchor) {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId &&
                targetId !== "#"
            ) {

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    const navbarHeight =
                        navbar.offsetHeight;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight;

                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }

            }

        });

    });


});
