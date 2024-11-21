import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/styles.min.css';
import user1 from "../assets/images/profile/user-1.jpg";
import {Icon} from '@iconify/react';
import producttip from"../assets/images/backgrounds/product-tip.png";
import user2 from "../assets/images/profile/user-2.jpg";
import user3 from "../assets/images/profile/user-3.jpg";
import blogimg1 from "../assets/images/blog/blog-img1.jpg";
import blogimg2 from "../assets/images/blog/blog-img2.jpg";
import blogimg3 from "../assets/images/blog/blog-img3.jpg";
import WeatherPredictionChart from "./WeatherPredictionChart.jsx";
import WeatherDataFetcher from "./WeatherDataFetcher.jsx";
import {Link} from "react-router-dom";
import { WiDaySunny, WiCloud, WiRain, WiStrongWind, WiBarometer, WiHumidity,WiWindDeg,WiSmoke } from 'react-icons/wi';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css'; // Import the CSS file
import { useTranslation } from 'react-i18next';




const Dashboard = () => {
    const { t } = useTranslation();

    const [currentWeather, setCurrentWeather] = useState({
        temperature: '',
        rainProbability: '',
        windSpeed: '',
        windDirection: '',
        city: '',
        country: '',
        pressure: '',
        weatherCondition: '',
        uvIndex: '',
        airQuality: '',
        humidity: '',
    });

    console.log('Current Weather in Dashboard:', currentWeather); // Debug log
    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'Clear':
                return <WiDaySunny style={{ fontSize: '48px' }} />;
            case 'Clouds':
                return <WiCloud style={{ fontSize: '48px' }} />;
            case 'Rain':
                return <WiRain style={{ fontSize: '48px' }} />;
            default:
                return <WiDaySunny style={{ fontSize: '48px' }} />;
        }
    };


    const getWindDirection = (degree) => {
        if (degree > 337.5 || degree <= 22.5) return 'N';
        if (degree > 22.5 && degree <= 67.5) return 'NE';
        if (degree > 67.5 && degree <= 112.5) return 'E';
        if (degree > 112.5 && degree <= 157.5) return 'SE';
        if (degree > 157.5 && degree <= 202.5) return 'S';
        if (degree > 202.5 && degree <= 247.5) return 'SW';
        if (degree > 247.5 && degree <= 292.5) return 'W';
        if (degree > 292.5 && degree <= 337.5) return 'NW';
    };

    console.log('Current Air Quality:', currentWeather.airQuality); // Debug log

    
    const getAirQualityValue = (quality) => {
        switch (quality.toLowerCase()) {
          case 'good':
            return 100; // Good
          case 'fair':
            return 75; // Fair
          case 'moderate':
            return 50; // Moderate
          case 'poor':
            return 25; // Poor
          case 'very poor':
            return 10; // Very Poor
          default:
            return 0; // Unknown
        }
      };
    
      const getAirQualityColor = (quality) => {
        switch (quality.toLowerCase()) {
          case 'good':
            return '#00e400'; // Good - Green
          case 'fair':
            return '#9acd32'; // Fair - YellowGreen
          case 'moderate':
            return '#ff7e00'; // Moderate - Orange
          case 'poor':
            return '#ffff00'; // Poor - Yellow
          case 'very poor':
            return '#ff0000'; // Very Poor - Red
          default:
            return '#d3d3d3'; // Default to Light Grey for unknown values
        }
      };


    return (

            <div className="container-fluid">
            <div className="row">
            <div className="col-lg-8">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title d-flex align-items-center gap-2 mb-4">
                    {t('weatherPredictions')}
                    <span>
                        <Icon
                        icon="solar:question-circle-bold"
                        className="fs-7 d-flex text-muted"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-custom-class="tooltip-success"
                        data-bs-title={t('trafficOverview')}
                        />
                    </span>
                    </h5>
                    <div id="traffic-overview">
                    <WeatherPredictionChart />
                    </div>
                </div>
                </div>
            </div>
            {/* Right Column with the two cards */}
            <div className="col-lg-4">
                <div style={{ fontFamily: 'Arial, sans-serif' }}>
                {/* First card with weather information */}
                <div
                    style={{
                    backgroundColor: 'rgb(1, 192, 200)',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '0px',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '300px',
                    }}
                >
                    <div style={{ textAlign: 'left' }}>
                    <h1 style={{ fontSize: '48px', margin: '0', color: '#ffffff' }}>
                        {currentWeather.temperature}°C
                    </h1>
                    <p style={{ fontSize: '16px', margin: '0' }}>
                        {currentWeather.city}, {currentWeather.country}
                    </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                    {getWeatherIcon(currentWeather.weatherCondition)}
                    <p style={{ fontSize: '16px', margin: '5px 0 0' }}>
                        {currentWeather.weatherCondition}
                    </p>
                    <p style={{ fontSize: '14px', margin: '0' }}>
                        {new Date().toLocaleDateString()}
                    </p>
                    </div>
                </div>
                        {/* Second card with weather information */}
                    <div
                        style={{
                            backgroundColor: '#FF7043',
                            color: 'white',
                            padding: '20px',
                            borderRadius: '1px',
                            position: 'relative',
                            height: '195px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0px 6px 16px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <div style={{ textAlign: 'left' }}>
                            <h1 style={{ fontSize: '28px', margin: '0', color: '#ffffff' }}>{t('pressure')}</h1>
                            <p style={{ fontSize: '20px', margin: '0' }}>
                                <WiBarometer style={{ fontSize: '25px' }} /> {currentWeather.pressure} hPa
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <WiWindDeg
                                    className="compass"
                                    style={{
                                        fontSize: '48px',
                                        transform: `rotate(${currentWeather.windDirection}deg)`,
                                        transition: 'transform 0.3s ease',
                                    }}
                                />
                                <p style={{ fontSize: '20px', margin: '0' }}><WiStrongWind/> {currentWeather.windSpeed} m/s</p>
                                <p style={{ fontSize: '20px', margin: '0' }}>{getWindDirection(currentWeather.windDirection)}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>


                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h4 className="mt-7">{currentWeather.temperature}°C</h4>
                                    <h4 className="mt-7">{t('temperature')}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h4 className="mt-7">{currentWeather.rainProbability}%</h4>
                                    <h4 className="mt-7">{t('rainprobability')}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h4 className="mt-7">{currentWeather.windSpeed} m/s</h4>
                                    <h4 className="mt-7">{t('windSpeed')}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <WeatherDataFetcher setCurrentWeather={setCurrentWeather}/>
                </div>
                <div className="col-lg-4">
                    <div className="card" style={{ backgroundColor: '#2196F3', color: 'white', height: '200px' }}>
                        <div className="card-body">
                            <h4 className="mt-7" style={{ position: 'absolute', top: '0px', left: '10px', color: '#ffffff' }}>{t('uvIndex')}</h4>
                            <div className="text-center" style={{ marginTop: '40px' }}>
                                <WiDaySunny style={{ fontSize: '48px' }} />
                                <h4 className="mt-7">{currentWeather.uvIndex}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card" style={{ backgroundColor: '#2196F3', color: 'white', height: '200px' }}>
                        <div className="card-body">
                        <h4 className="mt-7" style={{ position: 'absolute', top: '10px', left: '10px', color: '#ffffff' }}>
                            {t('airQuality')}
                        </h4>
                        <div className="text-center" style={{ marginTop: '40px' }}>
                            <div style={{ width: '100px', height: '100px', margin: '0 auto' }}>
                            <CircularProgressbarWithChildren
                                value={getAirQualityValue(currentWeather.airQuality)}
                                maxValue={100}
                                styles={buildStyles({
                                pathColor: getAirQualityColor(currentWeather.airQuality),
                                trailColor: '#d6d6d6', // Light grey for the trail
                                strokeLinecap: 'butt',
                                })}
                            >
                                <div style={{ fontSize: 12, marginTop: -5 }}>
                                <strong>{currentWeather.airQuality}</strong>
                                </div>
                            </CircularProgressbarWithChildren>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                <div className="col-lg-4">
                    <div className="card" style={{ backgroundColor: '#2196F3', color: 'white', height: '200px' }}>
                        <div className="card-body">
                            <h4 className="mt-7" style={{ position: 'absolute', top: '0px', left: '10px', color: '#ffffff' }}>{t('humidity')}</h4>
                            <div className="text-center" style={{ marginTop: '40px' }}>
                                <WiHumidity style={{ fontSize: '38px' }} />
                                <h4 className="mt-7">{currentWeather.humidity}%</h4>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Map Section */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">{t('satelliteMap')}</h5>
                            <iframe
                                    src="https://www.ventusky.com/?p=50.7;3.2;5&l=temperature-2m"
                                    width="100%"
                                    height="500px"
                                    style={{ border: 'none' }}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title d-flex align-items-center gap-2 mb-5 pb-3">
                                Crop Yield by Type
                                <span>
                    <Icon
                        icon="solar:question-circle-bold"
                        className="fs-7 d-flex text-muted"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-custom-class="tooltip-success"
                        data-bs-title="Yield distribution"
                    />
                  </span>
                            </h5>
                            <div className="row">
                                <div className="col-4">
                                    <Icon
                                        icon="solar:grain-line-duotone"
                                        className="fs-7 d-flex text-primary"
                                    />
                                    <span className="fs-11 mt-2 d-block text-nowrap">Wheat</span>
                                    <h4 className="mb-0 mt-1">50%</h4>
                                </div>
                                <div className="col-4">
                                    <Icon
                                        icon="solar:corn-line-duotone"
                                        className="fs-7 d-flex text-secondary"
                                    />
                                    <span className="fs-11 mt-2 d-block text-nowrap">Corn</span>
                                    <h4 className="mb-0 mt-1">30%</h4>
                                </div>
                                <div className="col-4">
                                    <Icon
                                        icon="solar:carrot-line-duotone"
                                        className="fs-7 d-flex text-success"
                                    />
                                    <span className="fs-11 mt-2 d-block text-nowrap">
                      Vegetables
                    </span>
                                    <h4 className="mb-0 mt-1">20%</h4>
                                </div>
                            </div>
                            <div className="vstack gap-4 mt-7 pt-2">
                                <div>
                                    <div className="hstack justify-content-between">
                                        <span className="fs-3 fw-medium">Wheat</span>
                                        <h6 className="fs-3 fw-medium text-dark lh-base mb-0">
                                            50%
                                        </h6>
                                    </div>
                                    <div
                                        className="progress mt-6"
                                        role="progressbar"
                                        aria-label="Wheat yield"
                                        aria-valuenow={50}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-primary"
                                            style={{width: "100%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="hstack justify-content-between">
                                        <span className="fs-3 fw-medium">Corn</span>
                                        <h6 className="fs-3 fw-medium text-dark lh-base mb-0">
                                            30%
                                        </h6>
                                    </div>
                                    <div
                                        className="progress mt-6"
                                        role="progressbar"
                                        aria-label="Corn yield"
                                        aria-valuenow={30}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-secondary"
                                            style={{width: "60%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="hstack justify-content-between">
                                        <span className="fs-3 fw-medium">Vegetables</span>
                                        <h6 className="fs-3 fw-medium text-dark lh-base mb-0">
                                            20%
                                        </h6>
                                    </div>
                                    <div
                                        className="progress mt-6"
                                        role="progressbar"
                                        aria-label="Vegetable yield"
                                        aria-valuenow={20}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-success"
                                            style={{width: "40%"}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-lg-4">
                    <div className="card overflow-hidden hover-img">
                        <div className="position-relative">
                            <a href="javascript:void(0)">
                                <img
                                    src={blogimg1}
                                    className="card-img-top"
                                    alt="matdash-img"
                                />
                            </a>
                            <span
                                className="badge text-bg-light text-dark fs-2 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                  2 min Read
                </span>
                            <img
                                src={user1}
                                alt="matdash-img"
                                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                                width={40}
                                height={40}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Georgeanna Ramero"
                            />
                        </div>
                        <div className="card-body p-4">
                <span className="badge text-bg-light fs-2 py-1 px-2 lh-sm  mt-3">
                  Social
                </span>
                            <a
                                className="d-block my-4 fs-5 text-dark fw-semibold link-primary"
                                href=""
                            >
                                As Tech Rises, Farmers Turn to AI Assistants for help
                            </a>
                            <div className="d-flex align-items-center gap-4">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="ti ti-eye text-dark fs-5"/>
                                    9,125
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <i className="ti ti-message-2 text-dark fs-5"/>3
                                </div>
                                <div className="d-flex align-items-center fs-2 ms-auto">
                                    <i className="ti ti-point text-dark"/>
                                    Mon, Dec 19
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card overflow-hidden hover-img">
                        <div className="position-relative">
                            <a href="javascript:void(0)">
                                <img
                                    src={blogimg2}
                                    className="card-img-top"
                                    alt="matdash-img"
                                />
                            </a>
                            <span
                                className="badge text-bg-light text-dark fs-2 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                  2 min Read
                </span>
                            <img
                                src={user2}
                                alt="matdash-img"
                                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                                width={40}
                                height={40}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Georgeanna Ramero"
                            />
                        </div>
                        <div className="card-body p-4">
                <span className="badge text-bg-light fs-2 py-1 px-2 lh-sm  mt-3">
                  Social
                </span>
                            <a
                                className="d-block my-4 fs-5 text-dark fw-semibold link-primary"
                                href=""
                            >
                                Farmers Seek Edge with AI Tools Amidst Tech Growth
                            </a>
                            <div className="d-flex align-items-center gap-4">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="ti ti-eye text-dark fs-5"/>
                                    4,150
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <i className="ti ti-message-2 text-dark fs-5"/>
                                    38
                                </div>
                                <div className="d-flex align-items-center fs-2 ms-auto">
                                    <i className="ti ti-point text-dark"/>
                                    Sun, Dec 18
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card overflow-hidden hover-img">
                        <div className="position-relative">
                            <a href="javascript:void(0)">
                                <img
                                    src={blogimg3}
                                    className="card-img-top"
                                    alt="matdash-img"
                                />
                            </a>
                            <span
                                className="badge text-bg-light text-dark fs-2 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                  2 min Read
                </span>
                            <img
                                src={user3}
                                alt="matdash-img"
                                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                                width={40}
                                height={40}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Georgeanna Ramero"
                            />
                        </div>
                        <div className="card-body p-4">
                <span className="badge text-bg-light fs-2 py-1 px-2 lh-sm  mt-3">
                  Health
                </span>
                            <a
                                className="d-block my-4 fs-5 text-dark fw-semibold link-primary"
                                href=""
                            >
                                AI Farming Tools Gain Traction as Challenges Loom Ahead
                            </a>
                            <div className="d-flex align-items-center gap-4">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="ti ti-eye text-dark fs-5"/>
                                    9,480
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <i className="ti ti-message-2 text-dark fs-5"/>
                                    12
                                </div>
                                <div className="d-flex align-items-center fs-2 ms-auto">
                                    <i className="ti ti-point text-dark"/>
                                    Sat, Dec 17
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 px-6 text-center"></div>
            </div>
        </div>

    );
};

export default Dashboard;
