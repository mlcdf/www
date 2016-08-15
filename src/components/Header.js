import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';


export default class Header extends Component {
  render() {
    return (
        <header className={css(styles.root)}>
            <a className={css(styles.logo, styles.hover)} href="">/mlcdf</a>
        </header>
    );
  }
}

const styles = StyleSheet.create({
    root: {
        marginTop: '4rem',
        marginBottom:'4rem'
    },
    logo: {
        color: '#FF5252',
        fontWeight: 'bold',
        fontSize: '1.125rem',
        fontFamily: 'monospace'
    },
    hover:{
        ':hover': {
            backgroundColor: '#FF5252',
            color: '#FFF'
        }
    }
})
