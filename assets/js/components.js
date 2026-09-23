document.addEventListener("DOMContentLoaded", function () {

    loadComponent("navbar", "components/navbar.html");
    loadComponent("footer", "components/footer.html");
    loadComponent("appointment-modal", "components/appointment-modal.html");

});


async function loadComponent(elementId, filePath) {

    const container = document.getElementById(elementId);

    if (!container) {
        return;
    }

    try {

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(
                "Unable to load component: " + filePath
            );
        }

        const html = await response.text();

        container.innerHTML = html;

        // Re-initialize components after loading
        initializeComponents();

    }
    catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="component-error">
                Component could not be loaded.
            </div>
        `;

    }

}


function initializeComponents() {

    initializeMobileMenu();

    initializeAppointmentModal();

    initializeCurrentYear();

    initializeDate();

}


/* ==========================================
   MOBILE MENU
========================================== */

function initializeMobileMenu() {

    const menuButton =
        document.getElementById("mobileMenuBtn");

    const navMenu =
        document.getElementById("navMenu");

    if (!menuButton || !navMenu) {
        return;
    }

    // Prevent duplicate listeners
    if (menuButton.dataset.initialized === "true") {
        return;
    }

    menuButton.dataset.initialized = "true";

    menuButton.addEventListener("click", function () {

        const isOpen =
            navMenu.classList.toggle("active");

        menuButton.classList.toggle(
            "active",
            isOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    // Close menu after clicking link
    const links =
        navMenu.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ==========================================
   APPOINTMENT MODAL
========================================== */

function initializeAppointmentModal() {

    const modal =
        document.getElementById("appointmentModal");

    if (!modal) {
        return;
    }

    const openButtons =
        document.querySelectorAll(
            "[data-open-appointment]"
        );

    const closeButtons =
        modal.querySelectorAll(
            "[data-close-appointment]"
        );


    openButtons.forEach(function (button) {

        if (button.dataset.initialized === "true") {
            return;
        }

        button.dataset.initialized = "true";

        button.addEventListener(
            "click",
            function () {

                openAppointmentModal();

            }
        );

    });


    closeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                closeAppointmentModal();

            }
        );

    });


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeAppointmentModal();

            }

        }
    );

}


function openAppointmentModal() {

    const modal =
        document.getElementById("appointmentModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeAppointmentModal() {

    const modal =
        document.getElementById("appointmentModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* ==========================================
   CURRENT YEAR
========================================== */

function initializeCurrentYear() {

    const year =
        document.getElementById("currentYear");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* ==========================================
   DATE
========================================== */

function initializeDate() {

    const dateInput =
        document.getElementById("appointmentDate");

    if (!dateInput) {
        return;
    }

    const today =
        new Date().toISOString().split("T")[0];

    dateInput.min = today;

}