import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Form,
  Label,
  Tooltip,
} from 'reactstrap';
import axios from 'axios';
import './DairyManagement.css'; // Import the CSS file
import { useTranslation } from 'react-i18next';

const DairyManagement = () => {
  const { t } = useTranslation();

  const [milkData, setMilkData] = useState({
    ph: '',
    temperature: '',
    taste: '',
    odor: '',
    fat: '',
    turbidity: '',
    colour: '',
  });
  const [quality, setQuality] = useState(null);
  const [animateResult, setAnimateResult] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [tooltipOpen, setTooltipOpen] = useState({}); // Track tooltip state for each field

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting milk data:', milkData);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/dairy', milkData);
      console.log('Prediction response:', response.data);
      const qualityMapping = {
        low: 0,
        mid: 1,
        high: 2,
      };
      setQuality(qualityMapping[response.data.quality.trim()]);
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

  const toggleTooltip = (field) => {
    setTooltipOpen((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="container-fluid">
      <h1>{t('dairyManagementTitle')}</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="4">
            <FormGroup>
              <Label for="ph">{t('phLevel')}</Label>
              <Input
                type="number"
                id="ph"
                value={milkData.ph}
                onChange={(e) => setMilkData({ ...milkData, ph: e.target.value })}
                placeholder="Enter pH level"
              />
              <Tooltip
                isOpen={tooltipOpen.ph}
                target="ph"
                toggle={() => toggleTooltip('ph')}
              >
                This defines the pH level of the milk.
              </Tooltip>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="temperature">{t('temperature')}</Label>
              <Input
                type="number"
                id="temperature"
                value={milkData.temperature}
                onChange={(e) => setMilkData({ ...milkData, temperature: e.target.value })}
                placeholder="Enter temperature"
              />
              <Tooltip
                isOpen={tooltipOpen.temperature}
                target="temperature"
                toggle={() => toggleTooltip('temperature')}
              >
                This is the temperature of the milk.
              </Tooltip>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="taste">{t('taste')}</Label>
              <Input
                type="text"
                id="taste"
                value={milkData.taste}
                onChange={(e) => setMilkData({ ...milkData, taste: e.target.value })}
                placeholder="Enter taste"
              />
              <Tooltip
                isOpen={tooltipOpen.taste}
                target="taste"
                toggle={() => toggleTooltip('taste')}
              >
                Defines the taste of the milk (0 for Bad, 1 for Good).
              </Tooltip>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <FormGroup>
              <Label for="odor">{t('odor')}</Label>
              <Input
                type="text"
                id="odor"
                value={milkData.odor}
                onChange={(e) => setMilkData({ ...milkData, odor: e.target.value })}
                placeholder="Enter odor"
              />
              <Tooltip
                isOpen={tooltipOpen.odor}
                target="odor"
                toggle={() => toggleTooltip('odor')}
              >
                Defines odor (0 for Bad, 1 for Good).
              </Tooltip>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="fat">{t('fat')}</Label>
              <Input
                type="number"
                id="fat"
                value={milkData.fat}
                onChange={(e) => setMilkData({ ...milkData, fat: e.target.value })}
                placeholder="Enter fat percentage"
              />
              <Tooltip
                isOpen={tooltipOpen.fat}
                target="fat"
                toggle={() => toggleTooltip('fat')}
              >
                Fat content percentage in the milk.
              </Tooltip>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="turbidity">{t('turbidity')}</Label>
              <Input
                type="text"
                id="turbidity"
                value={milkData.turbidity}
                onChange={(e) => setMilkData({ ...milkData, turbidity: e.target.value })}
                placeholder="Enter turbidity"
              />
              <Tooltip
                isOpen={tooltipOpen.turbidity}
                target="turbidity"
                toggle={() => toggleTooltip('turbidity')}
              >
                Defines turbidity (0 for Low, 1 for High).
              </Tooltip>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <FormGroup>
              <Label for="colour">{t('colour')}</Label>
              <Input
                type="text"
                id="colour"
                value={milkData.colour}
                onChange={(e) => setMilkData({ ...milkData, colour: e.target.value })}
                placeholder="Enter colour"
              />
              <Tooltip
                isOpen={tooltipOpen.colour}
                target="colour"
                toggle={() => toggleTooltip('colour')}
              >
              {t('colourTooltip')}
              </Tooltip>
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">
          {t('submit')}
        </Button>
      </Form>
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      <div className={`results ${animateResult ? 'fade-in' : ''}`}>
        {quality !== null && (
          <div className="result-window">
            <h5 className="result-title">
              {t('milkQuality')}: {quality === 0 ? t('low') : quality === 1 ? t('mid') : t('high')}
            </h5>
            <Row className="center-meter">
              <Col md="12">
                <meter
                  value={quality}
                  min="0"
                  max="2"
                  low="0.5"
                  high="1.5"
                  optimum="2"
                  style={{ width: '100%' }}
                ></meter>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default DairyManagement;
