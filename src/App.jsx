import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login'; // Import the Login component
import Register from './components/Register'; // Import the Register component
import CropManagement from './components/CropManagement';
import farmerlogo from "./assets/images/logos/logo-light.svg";
import { Icon } from "@iconify/react";
import user1 from "./assets/images/profile/user-1.jpg";
import DairyManagement from './components/DairyManagement';
import LanguageSwitcher from './components/LanguageSwitcher'; // Import the LanguageSwitcher component
import { useTranslation } from 'react-i18next';

function App() {
    const { t } = useTranslation();
    return (
        <Router>
            <div
                className="page-wrapper"
                id="main-wrapper"
                data-layout="vertical"
                data-navbarbg="skin6"
                data-sidebartype="full"
                data-sidebar-position="fixed"
                data-header-position="fixed"
            >
                {/* Sidebar Start */}
                <aside className="left-sidebar">
                    {/* Sidebar scroll*/}
                    <div>
                        <div className="brand-logo d-flex align-items-center justify-content-between">
                            <a href="/" className="text-nowrap logo-img">
                                <img
                                    src={farmerlogo}
                                    alt=""
                                    width="100%"
                                    height="90%"
                                />
                            </a>
                            <div
                                className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
                                id="sidebarCollapse"
                            >
                                <i className="ti ti-x fs-8" />
                            </div>
                        </div>
                        {/* Sidebar navigation*/}
                        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                            <ul id="sidebarnav">
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-6" />
                                    <span className="hide-menu">{t('home')}</span>
                                </li>
                                <li className="sidebar-item">
                                    <a
                                        className="sidebar-link"
                                        href="/"
                                        aria-expanded="false"
                                    >
                                        <span>
                                            <Icon
                                                icon="solar:home-smile-bold-duotone"
                                                className="fs-6"
                                            />
                                        </span>
                                        <span className="hide-menu">{t('dashboard')}</span>
                                    </a>
                                </li>
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-6" />
                                    <span className="hide-menu">{t('tools')}</span>
                                </li>
                                <li className="sidebar-item">
                                    <Link
                                        className="sidebar-link"
                                        to="/dairy-management"
                                        aria-expanded="false"
                                    >
                                        <span>
                                            <Icon
                                                icon="solar:layers-minimalistic-bold-duotone"
                                                className="fs-6"
                                            />
                                        </span>
                                        <span className="hide-menu">{t('dairyManagement')}</span>
                                    </Link>
                                </li>
                                <li className="sidebar-item">
                                    <Link
                                        className="sidebar-link"
                                        to="/crop-management"
                                        aria-expanded="false"
                                    >
                                        <span>
                                            <Icon
                                                icon="solar:danger-circle-bold-duotone"
                                                className="fs-6"
                                            />
                                        </span>
                                        <span className="hide-menu">{t('cropManagement')}</span>
                                    </Link>
                                </li>
     
                                <li className="nav-small-cap">
                                    <Icon
                                        icon="solar:menu-dots-linear"
                                        className="nav-small-cap-icon fs-6"
                                    />
                                    <span className="hide-menu">{t('auth')}</span>
                                </li>
                                <li className="sidebar-item">
                                    <a
                                        className="sidebar-link"
                                        href="/login"
                                        aria-expanded="false"
                                    >
                                        <span>
                                            <Icon
                                                icon="solar:login-3-bold-duotone"
                                                className="fs-6"
                                            />
                                        </span>
                                        <span className="hide-menu">{t('login')}</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a
                                        className="sidebar-link"
                                        href="/login"
                                        aria-expanded="false"
                                    >
                                        <span>
                                            <Icon
                                                icon="solar:user-plus-rounded-bold-duotone"
                                                className="fs-6"
                                            />
                                        </span>
                                        <span className="hide-menu">{t('register')}</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        {/* End Sidebar navigation */}
                    </div>
                    {/* End Sidebar scroll*/}
                </aside>
                {/*  Sidebar End */}
                {/*  Main wrapper */}
                <div className="body-wrapper">
                    {/* Header Start */}
                    <header className="app-header">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <ul className="navbar-nav">
                                <li className="nav-item d-block d-xl-none">
                                    <a
                                        className="nav-link sidebartoggler nav-icon-hover"
                                        id="headerCollapse"
                                        href="javascript:void(0)"
                                    >
                                        <i className="ti ti-menu-2" />
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-icon-hover" href="javascript:void(0)">
                                        <i className="bi bi-bell" />
                                        <div className="notification bg-primary rounded-circle" />
                                    </a>
                                </li>
                            </ul>
                            <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                                <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                                    <a href="#" target="_blank" className="btn btn-success">
                                        <span className="d-none d-md-block">Logout</span>{" "}
                                        <span className="d-block d-md-none">Logout</span>
                                    </a>
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link nav-icon-hover"
                                            href="javascript:void(0)"
                                            id="drop2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src={user1}
                                                alt=""
                                                width={35}
                                                height={35}
                                                className="rounded-circle"
                                            />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <LanguageSwitcher /> {/* Add the LanguageSwitcher component here */}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                    {/* Header End */}
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/crop-management" element={<CropManagement />} />
                        <Route path="/dairy-management" element={<DairyManagement />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;