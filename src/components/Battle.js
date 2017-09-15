import React from 'react';
import PlayerInput from '../components/PlayerInput';
import Results from '../components/Results';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PlayerPreview(props) {
  return (
    <div>
      <div className="column">
        <img src={props.avatar} alt={props.username} className="avatar" />
        <h2 className="username">@{props.username}</h2>
      </div>
      <button className="reset" onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>
    </div>
  );
}

PlayerPreview.PropTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, username) {
    this.setState(function() {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] =
        'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState(function() {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }

  render() {
    let {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage
    } = this.state;

    let match = this.props.match;

    return (
      <div>
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerOneImage !== null && (
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id="playerOne"
            />
          )}

          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerTwoImage !== null && (
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
              id="playerTwo"
            />
          )}

          {playerOneImage &&
          playerTwoImage && (
            <Link
              className="button"
              to={{
                pathname: `${match.url}/results`,
                search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
              }}
            >
              Battle
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default Battle;
