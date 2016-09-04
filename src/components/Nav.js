import React, { Component } from 'react';
import styles from './Nav.css';

export default class Nav extends Component {
  render() {
    return (
        <div className={styles.root}>
          <div className={styles.title}>
            {this.props.title}
          </div>
          <nav>
            {this.props.children}
          </nav>
        </div>
    );
  }
}
