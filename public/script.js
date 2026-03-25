// script.js
const form = document.getElementById("contactForm");
const thankMsg = document.getElementById("thankMsg");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // prevent page reload

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  fetch("http://localhost:3000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
  .then(response => response.text())
  .then(data => {
    thankMsg.textContent = data; // show thank you message
    form.reset(); // clear the form
  })
  .catch(err => console.error(err));
});