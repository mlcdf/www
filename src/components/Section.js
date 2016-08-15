import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';


export default class Section extends Component {
  render() {
    return (
        <div className={css(styles.root)}>
            <div className={css(styles.subheader)}>{this.props.title}</div>
            <div>{this.props.children}</div>
        </div>
    );
  }
}

const styles = StyleSheet.create({
    root:{
        marginTop: '2rem',
        marginBottom: '6rem',
        maxWidth: '28rem',
        fontSize: '1.25rem',
        lineHeight: '2rem',
        fontFamily: 'Helvetica',
    },
    subheader:{
        color: 'grey',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontSize: '.875rem',
        fontWeight: 'bold',
        paddingBottom: '1rem'
    }
})
