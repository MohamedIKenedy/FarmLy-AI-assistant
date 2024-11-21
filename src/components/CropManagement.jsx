import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Form,
  Label,
} from 'reactstrap';
import WeatherDataFetcher from './WeatherDataFetcher';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import './CropManagement.css';
import { useTranslation } from 'react-i18next';

const CropManagement = () => {
  const { t } = useTranslation();

  const [weatherData, setWeatherData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [recommendation, setRecommendation] = useState('');
  const [animateResult, setAnimateResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const cropInfo = {
    apple: {
      image: 'src/assets/images/plants/apple.png',
      description: t('appleDescription'),
    },
    banana: {
      image: 'src/assets/images/plants/banana.png',
      description: t('bananaDescription'),
    },
    blackgram: {
      image: 'src/assets/images/plants/blackgram.png',
      description: t('blackgramDescription'),
    },
    chickpea: {
      image: 'src/assets/images/plants/chickpea.png',
      description: t('chickpeaDescription'),
    },
    coconut: {
      image: 'src/assets/images/plants/coconut.png',
      description: t('coconutDescription'),
    },
    coffee: {
      image: 'src/assets/images/plants/coffee.png',
      description: t('coffeeDescription'),
    },
    cotton: {
      image: 'src/assets/images/plants/cotton.png',
      description: t('cottonDescription'),
    },
    grapes: {
      image: 'src/assets/images/plants/grapes.png',
      description: t('grapesDescription'),
    },
    jute: {
      image: 'src/assets/images/plants/jute.png',
      description: t('juteDescription'),
    },
    kidneybeans: {
      image: 'src/assets/images/plants/kidneybeans.png',
      description: t('kidneybeansDescription'),
    },
    lentil: {
      image: 'src/assets/images/plants/lentil.png',
      description: t('lentilDescription'),
    },
    maize: {
      image: 'src/assets/images/plants/maize.png',
      description: t('maizeDescription'),
    },
    mango: {
      image: 'src/assets/images/plants/mango.png',
      description: t('mangoDescription'),
    },
    mothbeans: {
      image: 'src/assets/images/plants/mothbeans.png',
      description: t('mothbeansDescription'),
    },
    mungbean: {
      image: 'src/assets/images/plants/mungbean.png',
      description: t('mungbeanDescription'),
    },
    muskmelon: {
      image: 'src/assets/images/plants/muskmelon.png',
      description: t('muskmelonDescription'),
    },
    orange: {
      image: 'src/assets/images/plants/orange.png',
      description: t('orangeDescription'),
    },
    papaya: {
      image: 'src/assets/images/plants/papaya.png',
      description: t('papayaDescription'),
    },
    pigeonpeas: {
      image: 'src/assets/images/plants/pigeonpeas.png',
      description: t('pigeonpeasDescription'),
    },
    pomegranate: {
      image: 'src/assets/images/plants/pomegranate.png',
      description: t('pomegranateDescription'),
    },
    rice: {
      image: 'src/assets/images/plants/rice.png',
      description: t('riceDescription'),
    },
    watermelon: {
      image: 'src/assets/images/plants/watermelon.png',
      description: t('watermelonDescription'),
    },
  };

  const setCurrentWeather = (data) => {
    console.log('Fetched Weather Data:', data);
    setWeatherData({
      ...weatherData,
      temperature: data.temperature,
      rainfall: data.rainProbability,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting weather data:', weatherData);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/predict', weatherData);
      console.log('Prediction response:', response.data);
      setRecommendation(response.data.recommendation.replace(/"/g, '').trim());
      setAnimateResult(true);
      setTimeout(() => setAnimateResult(false), 1000);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.querySelector('.container-fluid').classList.add('fade-in');
  }, []);

  return (
    <div className="container-fluid">
      <h1>{t('cropManagementTitle')}</h1>
      <WeatherDataFetcher setCurrentWeather={setCurrentWeather} />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="4">
            <FormGroup>
              <Label for="nitrogen">{t('nitrogen')}</Label>
              <Input
                type="number"
                id="nitrogen"
                value={weatherData.nitrogen}
                onChange={(e) => setWeatherData({ ...weatherData, nitrogen: e.target.value })}
                placeholder={t('enterNitrogenLevel')}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="phosphorus">{t('phosphorus')}</Label>
              <Input
                type="number"
                id="phosphorus"
                value={weatherData.phosphorus}
                onChange={(e) => setWeatherData({ ...weatherData, phosphorus: e.target.value })}
                placeholder={t('enterPhosphorusLevel')}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="potassium">{t('potassium')}</Label>
              <Input
                type="number"
                id="potassium"
                value={weatherData.potassium}
                onChange={(e) => setWeatherData({ ...weatherData, potassium: e.target.value })}
                placeholder={t('enterPotassiumLevel')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <FormGroup>
              <Label for="temperature">{t('temperature')}</Label>
              <Input
                type="number"
                id="temperature"
                value={weatherData.temperature}
                onChange={(e) => setWeatherData({ ...weatherData, temperature: e.target.value })}
                placeholder={t('enterTemperature')}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="humidity">{t('humidity')}</Label>
              <Input
                type="number"
                id="humidity"
                value={weatherData.humidity}
                onChange={(e) => setWeatherData({ ...weatherData, humidity: e.target.value })}
                placeholder={t('enterHumidity')}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="ph">{t('phLevel')}</Label>
              <Input
                type="number"
                id="ph"
                value={weatherData.ph}
                onChange={(e) => setWeatherData({ ...weatherData, ph: e.target.value })}
                placeholder={t('enterPhLevel')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <FormGroup>
              <Label for="rainfall">{t('rainfall')}</Label>
              <Input
                type="number"
                id="rainfall"
                value={weatherData.rainfall}
                onChange={(e) => setWeatherData({ ...weatherData, rainfall: e.target.value })}
                placeholder={t('enterRainfall')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">
          {t('submit')}
        </Button>
      </Form>
      {loading && (
        <div className="loading-spinner">
          <ClipLoader color="#007bff" loading={loading} size={50} />
        </div>
      )}
      <div className={`results ${animateResult ? 'fade-in' : ''}`}>
        {recommendation && (
          <div className="result-window">
            <h5 className="result-title">
              {t('recommendedCrop')}: {t(recommendation)}
            </h5>
            {cropInfo[recommendation] ? (
              <div className="crop-info">
                <img
                  src={cropInfo[recommendation].image}
                  alt={recommendation}
                  className="crop-image"
                />
                <p>{cropInfo[recommendation].description}</p>
              </div>
            ) : (
              <p>{t('noCropInfo')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropManagement;