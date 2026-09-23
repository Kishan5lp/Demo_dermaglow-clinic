/* =========================================
   APPOINTMENT FORM
========================================= */

const appointmentForm =
    document.getElementById("appointmentForm");

const appointmentMessage =
    document.getElementById("appointmentMessage");


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const formData =
                new FormData(appointmentForm);


            const name =
                formData.get("name");

            const treatment =
                formData.get("treatment");

            const date =
                formData.get("date");

            const time =
                formData.get("time");


            appointmentMessage.style.display =
                "block";


            appointmentMessage.innerHTML = `
                <strong>Appointment request received.</strong>
                <br>
                Thank you ${name}.
                Your ${treatment} consultation request
                for ${date} at ${time} has been recorded
                in this demo.
            `;


            appointmentForm.reset();

        }
    );

}