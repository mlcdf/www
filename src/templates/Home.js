import React, { Component } from 'react';
import Header from '../components/Header';
import Section from '../components/Section';
import Row from '../components/Row';
import Nav from '../components/Nav';

export default class Home extends Component {
  render() {
    return (
        <main>

            <Header name="/mlcdf"/>

            <Section title="About">
                <p>Also known as Maxime Le Conte des Floris.</p>
                <p>Student in Web Development and Digital Imaging. Linux lover. Film enthusiast.</p>
                <p>Living in Bordeaux, France.</p>
            </Section>

            <Section title="Projects">
                <Row url="https://github.com/mlcdf/opaline" title="Opaline">
                    Tiny Node.js API/CLI that gives you access to popular color palettes
                </Row>
                <Row url="https://github.com/mlcdf/generator-pym" title="Generator Pym">
                    Scaffold out a Python module using Yeoman
                </Row>
                <Row url="https://github.com/mlcdf/ikarauraga" title="Ikarauraga">
                    2D space shooter made in a weekend with Unity
                </Row>
                <Row url="https://github.com/mlcdf/blackboard" title="Blackboard">
                    Simple Python script to manage your to-do lists
                </Row>
                <Row url="https://github.com/mlcdf/material-utilities" title="Material Utilities">
                    CSS shadows & opacities for Material Design
                </Row>
            </Section>

            <Section title="">
              <a href="mailto:hi@mlcdf.com">Email</a>
              <a href="https://twitter.com/mlcdf">Twitter</a>
              <a href="https://github.com/mlcdf">Github</a>
            </Section>

      </main>
    );
  }
}
