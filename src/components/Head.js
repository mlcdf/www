import React from 'react'

export default class Head extends React.Component {
    render() {
        return (
            <head>
              <meta charset="utf-8"/>
              <meta http-equiv="X-UA-compatible" content="IE=edge, chrome=1"/>
              <meta name="viewport" content="width=device-width, initial-scale=1"/>
              <meta name="description" content="Maxime Le Conte des Floris is a web developer and open source enthusiast located in Bordeaux."/>
              <meta name="author" content="Maxime Le Conte des Floris"/>
              <meta name="theme-color" content="#333"/>
              <title>{this.props.title}</title>
              <link rel="manifest" href="manifest.json"/>
              <link rel="stylesheet" href="styles.css"/>
            </head>
        )
    }
}
