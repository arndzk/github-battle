import React from 'react';
import PropTypes from 'prop-types';
import { GoOrganization } from 'react-icons/go';
import { GiBoxingGlove, GiLaurelsTrophy, GiCancel } from 'react-icons/gi';

function Instructions () {
    return (
        <div className = 'instructions-container'>
            <h1 className = 'center-text header-lg'>Instructions</h1>
            <ol className = 'container-sm grid center-text battle-instructions'>
                <li>
                    <h3 className = 'header-sm'>Enter two Github users...</h3>
                    <GoOrganization className = 'bg-light' color = '#cfcfc4' size = {140} />
                </li>
                <li>
                    <h3 className = 'header-sm'>... have them battle it out...</h3>
                    <GiBoxingGlove className = 'bg-light' color = '#ff6961' size = {140} />
                </li>
                <li>
                    <h3 className = 'header-sm'>... and see who wins!</h3>
                    <GiLaurelsTrophy className = 'bg-light' color = '#ffb347' size = {140} />
                </li>
            </ol>
        </div>
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
            <form className = 'column player' onSubmit = {this.handleSubmit}>
                <label htmlFor = 'username' className = 'player-label'>
                    {this.props.label}
                </label>
                <div className = 'row player-inputs'>
                    <input
                        type = 'text'
                        id = 'username'
                        className = 'input-light'
                        placeholder = 'Github Username'
                        autoComplete = 'off'
                        value = {this.state.username}
                        onChange = {this.handleChange}
                    />
                    <button
                        className = 'btn btn-dark'
                        type = 'submit'
                        disabled = {!this.state.username}
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview ({ username, onReset, label }) {
    return (
        <div className = 'column player'>
            <h3 className = 'player-label'>{label}</h3>
            <div className = 'row bg-ligh'>
                <div className = 'player-info'>
                    <img 
                        className = 'avatar-sm'
                        src = {`https://github.com/${username}.png?size=200`}
                        alt = {`Avatar for ${username}`}
                    />
                    <a 
                        href = {`https://github.com/${username}`}
                        className = 'link'>
                            {username}
                    </a>
                </div>
                <button className = 'btn-clear flex-center' onClick = {onReset}>
                    <GiCancel color = '#ff6961' size = {22}/>
                </button>
            </div>
        </div>
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
            playerTwo: null
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
        const { playerOne, playerTwo } = this.state;

        return (
            <React.Fragment>
                <Instructions />

                <div className = 'players-container'>
                    <h1 className = 'center-text header-lg'>
                        Players
                    </h1>
                    <div className = "row space-around">
                        {playerOne === null 
                            ? <PlayerInput
                                label = 'Player One'
                                onSubmit = {(player) => this.handleSubmit('playerOne', player)}
                            />
                            : <PlayerPreview 
                                username = {playerOne} 
                                label = 'Player One' 
                                onReset = {() => this.handleReset('playerOne')} 
                            />
                        }
                        {playerTwo === null 
                            ? <PlayerInput
                                label = 'Player Two'
                                onSubmit = {(player) => this.handleSubmit('playerTwo', player)}
                            />
                            : <PlayerPreview 
                                username = {playerTwo} 
                                label = 'Player Two' 
                                onReset = {() => this.handleReset('playerTwo')} 
                            />
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}