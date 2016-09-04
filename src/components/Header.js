import React, { Component } from 'react';
import styles from './Header.css';


export default class Header extends Component {
  render() {
    return (
        <header className={styles.root}>
            <a className={styles.logo} href="/">{this.props.name}</a>
            <p>{this.props.subtitle}</p>
        </header>
    );
  }
}
