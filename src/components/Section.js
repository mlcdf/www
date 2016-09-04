import React, { Component } from 'react';
import styles from './Section.css';

export default class Section extends Component {
  render() {
    return (
        <div className={`${styles.root}`}>
            <div className={styles.subheader}>{this.props.title}</div>
            <div>{this.props.children}</div>
        </div>
    );
  }
}
