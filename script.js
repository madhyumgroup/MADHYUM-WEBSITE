document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.getElementById("navbar");

    const updateNavbar = () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("mobile-open");

        });

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                navMenu.classList.remove("mobile-open");
            });

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       REQUIREMENT FORM
    ===================================================== */

    const form = document.getElementById("requirementForm");
    const message = document.getElementById("formMessage");

    if (form) {

        form.addEventListener("submit", function(event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const requirement =
                document.getElementById("requirementType").value;

            if (!name || !phone || !requirement) {

                message.textContent =
                    "Please complete the required fields.";

                message.style.color = "#9a3b32";

                return;
            }

            message.textContent =
                "Thank you. Your requirement has been received. The MADHYUM team will connect with you.";

            message.style.color = "#6d6a61";

            form.reset();

        });

    }


    /* =====================================================
       SIMPLE REVEAL ANIMATION
    ===================================================== */

    const revealItems = document.querySelectorAll(
        ".intro-grid, .value-statement, .journey-step, .wing-card, .membership-content, .member-card, .network-node, .partner-cta, .form-card"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(25px)";
        item.style.transition =
            "opacity .8s ease, transform .8s ease";

        observer.observe(item);

    });

});
