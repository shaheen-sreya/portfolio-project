document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch("/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(res => res.text())
    .then(data => {
        console.log("Response:", data);

        setTimeout(() => {
             window.location.href = "thankyou.html";
        }, 300);
    })
    .catch(err => {
        console.log(err);
        alert("Error sending message");
    });
});
