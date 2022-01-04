import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdArrowBackIosNew } from 'react-icons/md';
import './Details.scss';
import { fetchCovidData } from '../redux/covid/covid';

const Details = (props) => {
  const { region } = props;

  const slug = region.slug.replace('-', '_');

  const covidData = useSelector((state) => state.covid);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!covidData[slug]) dispatch(fetchCovidData(slug));
  }, []);

  return (
    <div>
      <div className="details-header">
        <Link to="/">
          <MdArrowBackIosNew />
        </Link>
        <p>state/region details</p>
      </div>
      <div className="main-card">
        <img src={region.map_image_url} alt={`${region.state}-map`} />
        <div>
          <h1>{`${region.state} (${region.code})`}</h1>
          <p>{region.nickname}</p>
        </div>
      </div>
      <div className="bar">GENERAL INFORMATION</div>
      <ul>
        <li className="data-item">
          <span className="tag">Population</span>
          <span className="data">
            {region.population.toLocaleString('en-US')}
          </span>
        </li>
        <li className="data-item">
          <span className="tag">Population Rank</span>
          <span className="data">{region.population_rank}</span>
        </li>
        <li className="data-item">
          <span className="tag">Capital City</span>
          <span className="data">{region.capital_city}</span>
        </li>
      </ul>
      <div className="bar">TODAY&apos;S COVID INFORMATION</div>
      <ul>
        {covidData[slug] ? (
          Object.keys(covidData[slug])
            .filter((x) => x !== 'id')
            .map((key) => (
              <li key={key} className="data-item">
                <span className="tag">
                  {`${key.charAt(0).toUpperCase()}${key
                    .slice(1)
                    .replace(/_/g, ' ')}`}
                </span>
                <span className="data">
                  {covidData[slug][key].toLocaleString('en-US')}
                </span>
              </li>
            ))
        ) : (
          <li className="data-item">Loading...</li>
        )}
      </ul>
    </div>
  );
};

Details.propTypes = {
  region: PropTypes.instanceOf(Object).isRequired,
};

export default Details;
