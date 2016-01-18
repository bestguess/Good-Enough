const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');
const { routeActions } = require('redux-simple-router');

function Test({ push, children }) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/login">Login</Link>
      </header>
      <div style={{borderTop: '1px solid #e0e0e0'}}>{children}</div>
    </div>
  );
};

module.exports = connect(
  null,
  { push: routeActions.push }
)(Test);
