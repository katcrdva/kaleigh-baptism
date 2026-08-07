const form = document.getElementById("rsvpForm");
const popup = document.getElementById("successPopup");

const scriptURL = "https://script.google.com/macros/s/AKfycby2D5JyMLlHVS2xVtrC3oF4hCMwM0jmIqfbLQvJ9vTpEqat2uWD4A9nrwIRmIOkq4jz/exec";

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    const data = {
        name: document.getElementById("name").value.trim(),
        guests: document.getElementById("guests").value,
        attendance: document.getElementById("attendance").value,
        message: document.getElementById("message").value.trim(),
        userAgent: navigator.userAgent
    };

    try {

        const response = await fetch(scriptURL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.result === "success") {

            popup.classList.add("show");

            form.reset();

        } else {

            alert("Unable to save RSVP. Please try again.");

        }

    } catch (error) {

        console.error(error);

        alert("Something went wrong. Please try again.");

    } finally {

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

    }

});

function closePopup() {
    popup.classList.remove("show");
}