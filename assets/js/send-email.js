// Initialize EmailJS with your User ID
emailjs.init("7hwZANHfCJoqa-yiN");

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const status = document.getElementById("status");
  status.textContent = "";

  // Get form values
  const first_name = document.getElementById("fname").value.trim();
  const last_name = document.getElementById("lname").value.trim();
  const from_email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service_name = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  // Validation
  if (!first_name || !last_name || !from_email || !phone || !service_name || !message) {
    status.textContent = "Please fill in all fields.";
    return;
  }
  // Simple email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email)) {
    status.textContent = "Please enter a valid email address.";
    return;
  }

  status.textContent = "Sending...";

  const formData = {
    first_name,
    last_name,
    from_email,
    phone,
    service_name,
    description:message
  };
  console.log("Form Data:", formData);
  // Send email to recipient (you)
  emailjs.send("service_o9vjtyi", "template_puz0k3a", formData)
    .then(() => {
      // Send auto-response to user
      return emailjs.send("service_o9vjtyi", "template_6b1wfbe", {
        email: from_email,
        first_name,
        service_name,
    description:message
      });
    })
    .then(() => {
      status.textContent = "Emails sent successfully! Check your inbox for details.";
      setTimeout(() => {
        status.textContent = "";
      }, 5000); // Clear status after 5 seconds
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      status.textContent = "Failed to send emails: " + (error.text || error.message);
    });
});