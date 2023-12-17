// import './footer.css';
import logo from "../../assets/icons/logo2.png";
export default function Footer() {
  return (
    <footer class="bg-primary border-top mt-5">
      <div className="container">
        <div className="row  py-4">
          <div class="col mb-5">
            {/* <use xlink:href="#bootstrap"></use> */}
            <img src={logo} alt="logo" height={150} />

            {/* </a> */}
            <p class="text-white text-start">©2023 Made with ❤️</p>
            <p class="text-white text-start">This is a sample forum for Project CS300. If you’re interested in using it for your own purposes, please feel free to ask me.</p>
          </div>

          <div class="col mb-3"></div>
          {/* <div class="col mb-3"></div> */}


          {/* <div class="col mb-3">
            <h5>Section</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Home
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Features
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Pricing
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  FAQs
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  About
                </a>
              </li>
            </ul>
          </div> */}

          <div class="col mb-3 mt-5">
            <h5 className="text-white text-start">Contact Us</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2 d-flex flex-row ">
                <i class="bi bi-envelope text-white"></i>
                <a href="#" class="nav-link p-0 text-body-secondary text-white px-1">
                  nsminh21@apcs.fitus.edu.vn
                </a>

              </li>
              <li class="nav-item mb-2 d-flex flex-row ">
                <i class="bi bi-envelope text-white"></i>
                <a href="#" class="nav-link p-0 text-body-secondary text-white px-1">
                  ndtriet21@apcs.fitus.edu.vn
                </a>

              </li>
              <li class="nav-item mb-2 d-flex flex-row ">
                <i class="bi bi-envelope text-white"></i>
                <a href="#" class="nav-link p-0 text-body-secondary text-white px-1">
                  nxhoa21@apcs.fitus.edu.vn
                </a>

              </li>
              <li class="nav-item mb-2 d-flex flex-row ">
                <i class="bi bi-envelope text-white"></i>
                <a href="#" class="nav-link p-0 text-body-secondary text-white px-1">
                  htkha21@apcs.fitus.edu.vn
                </a>

              </li>
              <li class="nav-item mb-2 d-flex flex-row ">
                <i class="bi bi-envelope text-white"></i>
                <a href="#" class="nav-link p-0 text-body-secondary text-white px-1">
                  ntphung21@apcs.fitus.edu.vn
                </a>

              </li>
            </ul>
          </div>

    
        </div>
      </div>
    </footer>
  );
}