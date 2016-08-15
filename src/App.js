import React, { Component } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Section from './components/Section';
import Row from './components/Row';


// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  render() {
    return (
        <Layout>
            <Header name="mlcdf"/>

            <Section title="Currently">
                Student in Web Development & Digital Imaging at the Bordeaux Institute of Technology / intern at CGI.
            </Section>

            <Section title="Projects">
                <Row url="https://github.com/mlcdf/opaline" title="Opaline">
                    Tiny Node.js api/cli that gives you quick access to colors from popular palettes.
                </Row>
                <Row url="https://github.com/mlcdf/generator-pym" title="Generator Pym">
                    Scaffold out a Python module using Yeoman.
                </Row>
                <Row url="https://github.com/mlcdf/ikarauraga" title="Ikarauraga">
                    2D space shooter made for Ludum Dare 35 with my friend Clément Stéphano.
                </Row>
                <Row url="https://github.com/mlcdf/blackboard" title="Blackboard">
                    Python script to manage your to-do lists from the terminal.
                </Row>
                <Row url="https://github.com/mlcdf/material-utilities" title="Material Utilities">
                    Set of CSS classes & custom properties for Material shadows and opacities.
                </Row>
            </Section>

            <Section title="Contact">
                Shoot me an email at <a class="red underline-hover" href="https://github.com/mlcdf/generator-pym">hello@mlcdf.com</a>. You can also find me on <a class="red underline-hover" href="https://twitter.com/mlcdf">Twitter</a> and <a class="red underline-hover" href="https://github.com/mlcdf">Github</a>
            </Section>
      </Layout>
    );
  }
}
