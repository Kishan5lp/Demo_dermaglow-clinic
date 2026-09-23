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
   PROFESSIONAL BEFORE / AFTER AUTO CURSOR CONTROL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const comparison =
        document.getElementById("baComparison");

    const after =
        document.getElementById("baAfter");

    const divider =
        document.getElementById("baDivider");


    if (!comparison || !after || !divider) {
        return;
    }


    let animationFrame = null;

    let targetPosition = 50;

    let currentPosition = 50;


    /* =====================================================
       SET POSITION
    ===================================================== */

    function setPosition(position) {

        targetPosition =
            Math.max(
                0,
                Math.min(100, position)
            );

    }


    /* =====================================================
       ANIMATION
    ===================================================== */

    function animate() {

        /*
         * Smooth movement
         */

        currentPosition +=
            (targetPosition - currentPosition) * 0.16;


        /*
         * AFTER width
         */

        after.style.width =
            currentPosition + "%";


        /*
         * CENTER LINE
         */

        divider.style.left =
            currentPosition + "%";


        /*
         * Continue animation
         */

        animationFrame =
            requestAnimationFrame(animate);

    }


    /* =====================================================
       MOUSE MOVE
    ===================================================== */

    comparison.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                comparison.getBoundingClientRect();


            const position =
                ((event.clientX - rect.left)
                / rect.width) * 100;


            setPosition(position);

        }
    );


    /* =====================================================
       MOUSE ENTER
    ===================================================== */

    comparison.addEventListener(
        "mouseenter",
        function (event) {

            const rect =
                comparison.getBoundingClientRect();


            const position =
                ((event.clientX - rect.left)
                / rect.width) * 100;


            setPosition(position);

        }
    );


    /* =====================================================
       MOUSE LEAVE
    ===================================================== */

    comparison.addEventListener(
        "mouseleave",
        function () {

            /*
             * Return smoothly to center
             */

            setPosition(50);

        }
    );


    /* =====================================================
       TOUCH
    ===================================================== */

    comparison.addEventListener(
        "touchstart",
        function (event) {

            if (!event.touches.length) {
                return;
            }


            const rect =
                comparison.getBoundingClientRect();


            const position =
                ((event.touches[0].clientX - rect.left)
                / rect.width) * 100;


            setPosition(position);

        },
        {
            passive: true
        }
    );


    comparison.addEventListener(
        "touchmove",
        function (event) {

            if (!event.touches.length) {
                return;
            }


            const rect =
                comparison.getBoundingClientRect();


            const position =
                ((event.touches[0].clientX - rect.left)
                / rect.width) * 100;


            setPosition(position);

        },
        {
            passive: true
        }
    );


    /* =====================================================
       INITIAL POSITION
    ===================================================== */

    after.style.width = "50%";

    divider.style.left = "50%";


    /* Start animation */

    animate();

});


document.addEventListener("DOMContentLoaded", function () {

    const comparison =
        document.getElementById("baComparison");

    const after =
        document.getElementById("baAfter");

    const divider =
        document.getElementById("baDivider");


    if (!comparison || !after || !divider) {
        return;
    }


    let targetPosition = 50;

    let currentPosition = 50;

    let animationStarted = false;


    /* =====================================================
       LIMIT VALUE
    ===================================================== */

    function clamp(value, min, max) {

        return Math.max(
            min,
            Math.min(max, value)
        );

    }


    /* =====================================================
       GET CURSOR POSITION
    ===================================================== */

    function getPosition(clientX) {

        const rect =
            comparison.getBoundingClientRect();


        let position =
            ((clientX - rect.left) / rect.width) * 100;


        return clamp(position, 0, 100);

    }


    /* =====================================================
       SET TARGET POSITION
    ===================================================== */

    function setPosition(position) {

        targetPosition = clamp(
            position,
            0,
            100
        );

    }


    /* =====================================================
       SMOOTH ANIMATION
    ===================================================== */

    function animate() {

        const difference =
            targetPosition - currentPosition;


        /*
         * Smooth follow effect.
         */

        currentPosition +=
            difference * 0.14;


        /*
         * Stop tiny floating-point movement.
         */

        if (Math.abs(difference) < 0.01) {

            currentPosition =
                targetPosition;

        }


        /*
         * Update CSS variable.
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

            const position =
                getPosition(event.clientX);


            setPosition(position);

        }
    );


    /* =====================================================
       MOUSE ENTER
    ===================================================== */

    comparison.addEventListener(
        "mouseenter",
        function (event) {

            const position =
                getPosition(event.clientX);


            setPosition(position);

        }
    );


    /* =====================================================
       MOUSE LEAVE
    ===================================================== */

    comparison.addEventListener(
        "mouseleave",
        function () {

            /*
             * Automatically return
             * to the center.
             */

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


            const position =
                getPosition(
                    event.touches[0].clientX
                );


            setPosition(position);

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


            const position =
                getPosition(
                    event.touches[0].clientX
                );


            setPosition(position);

        },
        {
            passive: true
        }
    );



    comparison.style.setProperty(
        "--position",
        "50%"
    );


    /*
     * Start only once.
     */

    if (!animationStarted) {

        animationStarted = true;

        animate();

    }

});
