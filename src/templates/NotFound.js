import React, { Component } from 'react';
import Header from '../components/Header';
import Section from '../components/Section';
import Row from '../components/Row';

export default class NotFound extends Component {
  render() {
    return (
        <main>
            <Header name="/mlcdf"/>

            <Section title="404">
                Looks like you've got yourself lost. <a href="/">Click here.</a>
            </Section>
      </main>
    );
  }
}
