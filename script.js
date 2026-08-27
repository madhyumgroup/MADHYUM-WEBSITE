/* =========================================================
   MADHYAM GROUP WEBSITE SCRIPT
   ========================================================= */


/* =========================
   NAVIGATION OFFSET FIX
   ========================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function (event) {

        const targetId = this.getAttribute('href');

        if (!targetId || targetId === '#') {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const nav = document.querySelector('.main-nav');

        const navHeight = nav
            ? nav.offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top
            + window.pageYOffset
            - navHeight
            - 12;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

    });

});


/* =========================
   SIMPLE INQUIRY FORM
   ========================== */

const inquiryForm =
    document.getElementById('inquiryForm');

const formMessage =
    document.getElementById('formMessage');


if (inquiryForm) {

    inquiryForm.addEventListener(
        'submit',
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById('name').value.trim();

            const phone =
                document.getElementById('phone').value.trim();

            const requirement =
                document.getElementById('requirement').value;

            const message =
                document.getElementById('message').value.trim();


            if (!name || !phone) {

                formMessage.textContent =
                    'Please enter your name and phone number.';

                return;
            }


            /*
             * Temporary success behaviour.
             *
             * Later we can connect this form to:
             * WhatsApp
             * Email
             * Google Sheets
             * CRM
             * Hostinger backend
             */

            formMessage.textContent =
                'Thank you. Your requirement has been recorded.';


            console.log({
                name,
                phone,
                requirement,
                message
            });


            inquiryForm.reset();

        }
    );

}
