/* =========================================
   BEFORE / AFTER SLIDER
========================================= */

const comparison =
    document.querySelector(".comparison");

const beforeImage =
    document.querySelector(".comparison-before");

const handle =
    document.querySelector(".comparison-handle");


if (
    comparison &&
    beforeImage &&
    handle
) {

    let isDragging = false;


    function updateSlider(clientX) {

        const rect =
            comparison.getBoundingClientRect();

        let position =
            ((clientX - rect.left) / rect.width) * 100;

        position =
            Math.max(
                0,
                Math.min(100, position)
            );

        beforeImage.style.width =
            position + "%";

        handle.style.left =
            position + "%";

    }


    comparison.addEventListener(
        "mousedown",
        function () {
            isDragging = true;
        }
    );


    window.addEventListener(
        "mouseup",
        function () {
            isDragging = false;
        }
    );


    comparison.addEventListener(
        "mousemove",
        function (event) {

            if (!isDragging) return;

            updateSlider(event.clientX);

        }
    );


    comparison.addEventListener(
        "touchstart",
        function () {
            isDragging = true;
        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchend",
        function () {
            isDragging = false;
        }
    );


    comparison.addEventListener(
        "touchmove",
        function (event) {

            if (!isDragging) return;

            updateSlider(
                event.touches[0].clientX
            );

        },
        {
            passive: true
        }
    );


    /* Click anywhere */

    comparison.addEventListener(
        "click",
        function (event) {

            updateSlider(event.clientX);

        }
    );

}