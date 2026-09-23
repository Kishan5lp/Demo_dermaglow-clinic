/* =========================================
   DERMAGLOW MAIN JAVASCRIPT
========================================= */


/* MOBILE MENU */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const navMenu =
    document.getElementById("navMenu");


if (mobileMenuBtn && navMenu) {

    mobileMenuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("show");

        const icon =
            mobileMenuBtn.querySelector("i");

        if (navMenu.classList.contains("show")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    document.querySelectorAll(".nav-menu a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("show");

                const icon =
                    mobileMenuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            });

        });

}


/* SCROLL REVEAL */

const revealElements =
    document.querySelectorAll(
        ".treatment-card, .doctor-card, .testimonial-card, .why-item"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal");
                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(function (element) {

    observer.observe(element);

});


/* ACTIVE NAVIGATION */

const currentPage =
    window.location.pathname
        .split("/")
        .pop();


document.querySelectorAll(".nav-menu a")
    .forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (
            href &&
            href !== "#" &&
            href === currentPage
        ) {

            link.classList.add("active");

        }

    });


/* HEADER SHADOW */

window.addEventListener("scroll", function () {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 20) {

        navbar.style.boxShadow =
            "0 8px 30px rgba(13,81,77,.08)";

    } else {

        navbar.style.boxShadow = "none";

    }

});

/* =========================================================
   PROFESSIONAL BEFORE / AFTER
   AUTO CURSOR + TOUCH CONTROL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const comparison =
        document.getElementById("baComparison");

    const divider =
        document.getElementById("baDivider");

    if (!comparison || !divider) {
        return;
    }


    /* =====================================================
       POSITION
    ===================================================== */

    let targetPosition = 50;
    let currentPosition = 50;


    /* =====================================================
       CLAMP
    ===================================================== */

    function clamp(value, min, max) {

        return Math.max(
            min,
            Math.min(max, value)
        );

    }


    /* =====================================================
       GET POSITION
    ===================================================== */

    function getPosition(clientX) {

        const rect =
            comparison.getBoundingClientRect();

        if (!rect.width) {
            return 50;
        }

        const position =
            ((clientX - rect.left) / rect.width) * 100;

        return clamp(position, 0, 100);

    }


    /* =====================================================
       SET TARGET
    ===================================================== */

    function setPosition(position) {

        targetPosition =
            clamp(position, 0, 100);

    }


    /* =====================================================
       SMOOTH ANIMATION
    ===================================================== */

    function animate() {

        const difference =
            targetPosition - currentPosition;


        currentPosition +=
            difference * 0.16;


        if (Math.abs(difference) < 0.01) {

            currentPosition =
                targetPosition;

        }


        /*
         * IMPORTANT:
         * Only update CSS variable.
         *
         * DO NOT change image width.
         */

        comparison.style.setProperty(
            "--position",
            currentPosition + "%"
        );


        requestAnimationFrame(animate);

    }


    /* =====================================================
       MOUSE MOVE
    ===================================================== */

    comparison.addEventListener(
        "mousemove",
        function (event) {

            setPosition(
                getPosition(event.clientX)
            );

        }
    );


    /* =====================================================
       MOUSE ENTER
    ===================================================== */

    comparison.addEventListener(
        "mouseenter",
        function (event) {

            setPosition(
                getPosition(event.clientX)
            );

        }
    );


    /* =====================================================
       MOUSE LEAVE
       RETURN TO EXACT CENTER
    ===================================================== */

    comparison.addEventListener(
        "mouseleave",
        function () {

            setPosition(50);

        }
    );


    /* =====================================================
       TOUCH START
    ===================================================== */

    comparison.addEventListener(
        "touchstart",
        function (event) {

            if (!event.touches.length) {
                return;
            }

            setPosition(
                getPosition(
                    event.touches[0].clientX
                )
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       TOUCH MOVE
    ===================================================== */

    comparison.addEventListener(
        "touchmove",
        function (event) {

            if (!event.touches.length) {
                return;
            }

            setPosition(
                getPosition(
                    event.touches[0].clientX
                )
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       INITIAL POSITION
       ALWAYS 50 / 50
    ===================================================== */

    currentPosition = 50;
    targetPosition = 50;

    comparison.style.setProperty(
        "--position",
        "50%"
    );


    /* =====================================================
       START
    ===================================================== */

    requestAnimationFrame(animate);

});