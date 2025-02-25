
  const ShowServicePopup=(id)=>{
    console.log(id);
        const serviceWrapper=document.querySelector('#service-wrapper');
        serviceWrapper.innerHTML=`
  <div class="popup_modal_content ">
  <div class="service_details">
    <div class="row">
      <div class="col-lg-7 col-xl-8">
        <div class="service_details_content">
          <div class="service_info">
            <h6 class="subtitle">SERVICES</h6>
            <h2 class="title">Figma to React/Next.js Conversion</h2>
            <div class="desc">
              <p>
                We offer precise and efficient conversion of Figma designs into high-quality React.js and Next.js applications. Our development process ensures a seamless transition from design to code while maintaining responsiveness, accessibility, and performance.
              </p>

              <p>
                With a strong focus on pixel-perfect accuracy, we ensure that every UI element is implemented exactly as designed. Using Tailwind CSS, we enhance styling efficiency and maintainability while optimizing performance through best practices such as component reusability and state management. Additionally, we leverage Next.js features like Server-Side Rendering (SSR) and Static Site Generation (SSG) to boost speed and SEO-friendliness.
              </p>
            </div>

            <h3 class="title">Services Process</h3>
            <div class="desc">
              <p>
                Our process ensures efficient execution, from planning and design to development and deployment, delivering high-quality solutions that meet industry standards and client expectations.
              </p>
            </div>
            <ul>
              <li>Analyzing the Figma design structure to create a development plan.</li>
              <li>Converting components into modular React.js/Next.js elements.</li>
              <li>Implementing Tailwind CSS for styling while ensuring responsiveness.</li>
              <li>Optimizing the code for performance and accessibility before deployment.</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-5 col-xl-4">
        <div class="tj_main_sidebar">
          <div class="sidebar_widget services_list">
            <div class="widget_title">
              <h3 class="title">All Services</h3>
            </div>
            <ul>
              <li class="active">
                <button>
                  <i class="flaticon-design"></i>
                  Branding Design
                </button>
              </li>
              <li>
                <button>
                  <i class="flaticon-3d-movie"></i>
                  3D Animation
                </button>
              </li>
              <li>
                <button>
                  <i class="flaticon-ux-design"></i>
                  UI/UX Design
                </button>
              </li>
              <li>
                <button>
                  <i class="flaticon-web-design"></i>
                  Web Design
                </button>
              </li>
              <li>
                <button>
                  <i class="flaticon-ui-design"></i>
                  App Design
                </button>
              </li>
            </ul>
          </div>

          <div class="sidebar_widget contact_form">
            <div class="widget_title">
              <h3 class="title">Get in Touch</h3>
            </div>

            <form action="index.html">
              <div class="form_group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  autocomplete="off"
                />
              </div>
              <div class="form_group">
                <input
                  type="email"
                  name="semail"
                  id="semail"
                  placeholder="Email"
                  autocomplete="off"
                />
              </div>
              <div class="form_group">
                <textarea
                  name="smessage"
                  id="smessage"
                  placeholder="Your message"
                  autocomplete="off"
                ></textarea>
              </div>
              <div class="form_btn">
                <button class="btn tj-btn-primary" type="submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  }


  const serviceItems=document.querySelectorAll('.service-item');

    serviceItems.forEach((item,index)=>{
        item.addEventListener('click',()=>{
            ShowServicePopup(index);
        });
    });