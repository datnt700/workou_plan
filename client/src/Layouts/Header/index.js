import React, { Component } from 'react';
import '../../Assets/styles/workout.css';
import '../../Assets/styles/style.css';
import '../../Assets/styles/utility.css';
export class Header extends Component {
    render() {
        return (
            <nav id="navbar">
                <div className="container">
                    <div className="container-nav">
                        <h1 className="logo">HBT</h1>
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">Workout</a>
                            </li>
                            <li>
                                <a href="#">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
