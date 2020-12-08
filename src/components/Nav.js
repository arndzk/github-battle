import React from 'react';
import { ThemeConsumer } from '../contexts/theme';
import { NavLink } from 'react-router-dom';

const activeStyle = {
    color: '#77dd77'
}

export default function Nav () {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <nav className='row space-between'>
                    <ul className='row nav'>
                        <li>
                            <NavLink
                                className='nav-link'
                                to='/'
                                exact
                                activeStyle={activeStyle}
                            >
                                Battle
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className='nav-link'
                                to='/popular'
                                activeStyle={activeStyle}
                            >
                                Popular
                            </NavLink>
                        </li>
                    </ul>
                    <button
                        style = {{fontSize: 30}}
                        className = 'btn-clear'
                        onClick = {toggleTheme}
                    >
                        {theme === 'light' ? '🌞' : '🌛'}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}