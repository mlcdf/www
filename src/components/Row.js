import React, { Component } from 'react';
import styles from './Row.css';

export default class Row extends Component {
  render() {
    return (
        <div className={styles.root}>
            <a className={styles.title} href={this.props.url}>
              {this.props.title}
            </a>
            <p className={styles.content}>{this.props.children}</p>
        </div>
    );
  }
}
