import PropTypes from 'prop-types';

import './styles.css';

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="loader"></div>
    </div>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
