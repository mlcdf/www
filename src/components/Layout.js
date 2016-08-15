import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export default function Layout({ children }) {
  return (
    <main className={css(styles.root)}>
        {children}
    </main>
  )
}

const styles = StyleSheet.create({
    root:{
        fontSize: '1.25rem',
        color: '#111111',
        marginLeft: '16rem',
        maxWidth: '100rem',
        '@media (max-width: 1440px)':{
            marginLeft: '8rem'
        }
    },
    '::selection':{
        blackgroundColor: '#111111',
        color: '#FFF'
    }
})
