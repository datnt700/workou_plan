import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer id="main-footer">
                <div class="footer-content container">
                    <p>Copyright &copy; 2023. All Rights Reserved</p>
                    <div class="social">
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-facebook"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                </div>
            </footer>
        );
    }
}
