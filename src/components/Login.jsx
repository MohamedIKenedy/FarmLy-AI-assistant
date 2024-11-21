import React from 'react';
import '../assets/css/styles.min.css';
import farmerlogo from '../assets/images/logos/logo-light.svg';



const Login = () => (
  <div
    className="page-wrapper"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed"
  >
    <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-3">
            <div className="card mb-0">
              <div className="card-body">
                <a href="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src={farmerlogo} alt="Farmer AI Logo" />
                </a>
                <p className="text-center">Your Farmer Ai Helper</p>
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="form-check">
                      <input className="form-check-input primary" type="checkbox" id="flexCheckChecked" defaultChecked />
                      <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                        Remember this Device
                      </label>
                    </div>
                    <a className="text-primary fw-bold" href="./index.html">Forgot Password?</a>
                  </div>
                  <a href="/" className="btn btn-primary w-100 py-8 fs-4 mb-4">Sign In</a>
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="fs-4 mb-0 fw-bold">New to FarmDash?</p>
                    <a className="text-primary fw-bold ms-2" href="/register">Create an account</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
