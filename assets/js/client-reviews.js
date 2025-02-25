const clientTestimonials = [
  {
    name: "John Doe",
    designation: "Frontend Developer",
    feedback:
      "Exceptional work! Mehboob delivered a pixel-perfect conversion of my Figma design into a Next.js website. Fast, responsive, and clean code!",
  },
  {
    name: "Emma Smith",
    designation: "Project Manager",
    feedback:
      "Working with Mehboob was a game-changer. He not only built our web app using React.js but also optimized it for performance and SEO. Highly recommend!",
  },
  {
    name: "Carlos Martinez",
    designation: "UI/UX Designer",
    feedback:
      "Incredible attention to detail! He transformed my design into a fully functional site with Tailwind CSS and ensured a seamless UX. Will hire again!",
  },
  {
    name: "Sophia Lee",
    designation: "AI Specialist",
    feedback:
      "Mehboob is a true professional. He integrated OpenAI APIs into our project, making AI-powered automation smooth and efficient.",
  },
  {
    name: "Ali Khan",
    designation: "Full Stack Developer",
    feedback:
      "Fantastic experience! He built our entire MERN stack application, set up Firebase authentication, and deployed it flawlessly. Great communication too!",
  },
];

const clientReviews = document.querySelector("#review-Container");

clientTestimonials.forEach((testimonial) => {
  const div = document.createElement("div");
  div.classList.add("testimonial-item");
  div.innerHTML = `
<div class="icon-box">
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.105431 2.18998C0.0301532 0.988687 1.02531 -0.00647222 2.2266 0.0688056L19.4961 1.15097C21.2148 1.25867 22.0029 3.34358 20.7852 4.56127L4.5979 20.7486C3.3802 21.9663 1.2953 21.1781 1.1876 19.4594L0.105431 2.18998Z"
      fill="url(#paint0_linear_263_588)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_263_588"
        x1="-0.0363755"
        y1="-0.0729998"
        x2="35.3333"
        y2="-0.0729991"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="1"
          stop-color="var(--tj-theme-primary)"
        />
        <stop
          offset="1"
          stop-color="#140C1C"
          stop-opacity="0"
        />
      </linearGradient>
    </defs>
  </svg>
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.105431 2.18998C0.0301532 0.988687 1.02531 -0.00647222 2.2266 0.0688056L19.4961 1.15097C21.2148 1.25867 22.0029 3.34358 20.7852 4.56127L4.5979 20.7486C3.3802 21.9663 1.2953 21.1781 1.1876 19.4594L0.105431 2.18998Z"
      fill="url(#paint0_linear_263_589)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_263_589"
        x1="-0.0363755"
        y1="-0.0729998"
        x2="35.3333"
        y2="-0.0729991"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="1"
          stop-color="var(--tj-theme-primary)"
        />
        <stop
          offset="1"
          stop-color="#140C1C"
          stop-opacity="0"
        />
      </linearGradient>
    </defs>
  </svg>
</div>
<p class="quote">
  “${testimonial.feedback}
</p>
<h4 class="name">${testimonial.name}</h4>
<span class="designation"
  >${testimonial.designation}</span
>`;
    clientReviews.appendChild(div);
});
