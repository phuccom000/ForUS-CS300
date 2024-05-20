// import './footer.css';
import EmailIcon from '@mui/icons-material/Email';
import logo from "../../assets/icons/logo2.png";
export default function Footer() {
  return (
    <footer className="bg-primary border-top mt-5">
      <div className="container">
        <div className="row  py-4">
          <div className="col mb-5">
            {/* <use xlink:href="#bootstrap"></use> */}
            <img src={logo} alt="logo" height={150} />

            {/* </a> */}
            <p className="text-white text-start">This is a sample forum for Project CS300. If you’re interested in using it for your own purposes, please feel free to ask us.</p>
          </div>

          <div className="col mb-3"></div>
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

          <div className="col mb-3 mt-5">
            <h5 className="text-white text-start">Contact Us</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2 d-flex flex-row text-warning" >
                <EmailIcon className="text-white large" />

                <a href="#" className="nav-link p-0 text-body-secondary text-white px-1">
                  nhdinh21@apcs.fitus.edu.vn
                </a>

              </li>
              <li className="nav-item mb-2 d-flex flex-row text-warning">
                <EmailIcon className="text-white large" />

                <a href="#" className="nav-link p-0 text-body-secondary text-white px-1">
                  nhphuc21@apcs.fitus.edu.vn
                </a>

              </li>
              <li className="nav-item mb-2 d-flex flex-row text-warning">
                <EmailIcon className="text-white large" />

                <a href="#" className="nav-link p-0 text-body-secondary text-white px-1">
                  ntphung21@apcs.fitus.edu.vn
                </a>
              </li>
            </ul>
          </div>

          <p className="text-white text-center">©2023-2024 Made with ❤️</p>

        </div>

      </div>

    </footer>
  );
}
