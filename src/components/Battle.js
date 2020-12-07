import React from 'react';
import PropTypes from 'prop-types';
import { GoOrganization } from 'react-icons/go';
import { GiBoxingGlove, GiLaurelsTrophy, GiCancel } from 'react-icons/gi';
import Results from './Results';
import { ThemeConsumer } from '../contexts/theme';

function Instructions() {
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <div className='instructions-container'>
                    <h1 className='center-text header-lg'>
                        Instructions
            </h1>
                    <ol className='container-sm grid center-text battle-instructions'>
                        <li>
                            <h3 className='header-sm'>Enter two Github users...</h3>
                            <GoOrganization className={`bg-${theme}`} color='#cfcfc4' size={140} />
                        </li>
                        <li>
                            <h3 className='header-sm'>... have them battle it out...</h3>
                            <GiBoxingGlove className={`bg-${theme}`} color='#ff6961' size={140} />
                        </li>
                        <li>
                            <h3 className='header-sm'>... and see who wins!</h3>
                            <GiLaurelsTrophy className={`bg-${theme}`} color='#ffb347' size={140} />
                        </li>
                    </ol>
                </div>
            )}
        </ThemeConsumer>
    )
}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.username);
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <form className='column player' onSubmit={this.handleSubmit}>
                        <label htmlFor='username' className='player-label'>
                            {this.props.label}
                        </label>
                        <div className='row player-inputs'>
                            <input
                                type='text'
                                id='username'
                                className={`input-${theme}`}
                                placeholder='Github Username'
                                autoComplete='off'
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <button
                                className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                                type='submit'
                                disabled={!this.state.username}
                            >
                                Submit
                        </button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        );
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview({ username, onReset, label }) {
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <div className='column player'>
                <h3 className='player-label'>{label}</h3>
                <div className={`row bg-${theme}`}>
                    <div className='player-info'>
                        <img
                            className='avatar-sm'
                            src={`https://github.com/${username}.png?size=200`}
                            alt={`Avatar for ${username}`}
                        />
                        <a
                            href={`https://github.com/${username}`}
                            className='link'>
                            {username}
                        </a>
                    </div>
                    <button className='btn-clear flex-center' onClick={onReset}>
                        <GiCancel color='#ff6961' size={22} />
                    </button>
                </div>
            </div>
            )}
        </ThemeConsumer>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOne: null,
            playerTwo: null,
            battle: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, player) {
        this.setState({
            [id]: player
        })
    }

    handleReset(id) {
        this.setState({
            [id]: null
        })
    }

    render() {
        const { playerOne, playerTwo, battle } = this.state;

        if (battle === true) {
            return (
                <Results
                    playerOne={playerOne}
                    playerTwo={playerTwo}
                    onReset={() => this.setState({
                        playerOne: null,
                        playerTwo: null,
                        battle: false
                    })}
                />
            )
        }

        return (
            <React.Fragment>
                <Instructions />

                <div className='players-container'>
                    <h1 className='center-text header-lg'>
                        Players
                    </h1>
                    <div className="row space-around">
                        {playerOne === null
                            ? <PlayerInput
                                label='Player One'
                                onSubmit={(player) => this.handleSubmit('playerOne', player)}
                            />
                            : <PlayerPreview
                                username={playerOne}
                                label='Player One'
                                onReset={() => this.handleReset('playerOne')}
                            />
                        }
                        {playerTwo === null
                            ? <PlayerInput
                                label='Player Two'
                                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                            />
                            : <PlayerPreview
                                username={playerTwo}
                                label='Player Two'
                                onReset={() => this.handleReset('playerTwo')}
                            />
                        }
                    </div>
                    {playerOne && playerTwo && (
                        <button
                            className='btn btn-dark btn-space'
                            onClick={() => this.setState({ battle: true })}
                        >
                            Battle
                        </button>
                    )}
                </div>
            </React.Fragment>
        )
    }
}