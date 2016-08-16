import React, { Component } from 'react';
import Head from '../components/Head';
import styles from './App.css';

export default class App extends Component {
  render() {
    return (
      <html lang="en">
        <Head title='Maxime Le Conte des Floris'/>
        <body>
        <main>
            {this.props.children}
      </main>
    </body>
    </html>
    );
  }
}
