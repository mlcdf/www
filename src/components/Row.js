import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export default class Row extends Component {
  render() {
    return (
        <div className={css(styles.root)}>
            <a className={css(styles.title)} href={this.props.url}>~ {this.props.title}</a>
            <p className={css(styles.content)}>{this.props.children}</p>
        </div>
    );
  }
}

const styles = StyleSheet.create({
    root:{
        marginBottom: '3rem',
        transition: '.2s all ease-in'
    },
    title:{
        fontFamily: 'Monaco, Cousine, Roboto Mono, Segoe UI',
        display: 'block',
        fontWeight: 'bold',
        fontSize: '1.25rem',
        lineHeight: '2rem'
    },
    content:{
        display: 'block',
        fontSize: '1.25rem',
        lineHeight: '1.5',
        maxWidth: '26rem',
        color: '#212121',
        marginTop: '.5rem',
        marginBottom: '0',
        color: '#616161'
    }
})
