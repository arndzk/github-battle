import React from 'react';
import { GoOrganization } from 'react-icons/go';
import { GiHeavyFighter, GiLaurelsTrophy } from 'react-icons/gi';

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
                    <GiHeavyFighter className = 'bg-light' color = '#ff6961' size = {140} />
                </li>
                <li>
                    <h3 className = 'header-sm'>... and see who wins!</h3>
                    <GiLaurelsTrophy className = 'bg-light' color = '#ffb347' size = {140} />
                </li>
            </ol>
        </div>
    )
}

export default class Battle extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Instructions />
            </React.Fragment>
        )
    }
}