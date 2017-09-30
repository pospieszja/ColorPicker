import React from 'react';
import ReactDOM from 'react-dom';

import {convertHslToRgb} from './helpers.js'
import {convertRgbToHsl} from './helpers.js'


class ConvertedColor extends React.Component {
    render() {
        return (
            <span>
                <p>{this.props.color}</p>
            </span>
        )
    }
}

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ""
        }
    }

    handleInput(evt) {
        this.setState({
            color: evt.target.value,
        });

    }
    render() {

        const REGEX_RGB = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;
        const REGEX_HEX = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/;
        const REGEX_HSL = /^hsl\((\d{1,3})\,(\d{1,3})\%\,(\d{1,3})\%\)$/;

        const inputColorFormat = (color) => {
            if (REGEX_RGB.test(color))
                return "rgb";
            if (REGEX_HEX.test(color))
                return "hex";
            if (REGEX_HSL.test(color))
                return "hsl";
        };


        const getRgb = (format, color) => {
            let rgb = [];

            if (format === "rgb")
                return color

            if (format === "hex") {
                rgb = color.match(REGEX_HEX);
                rgb.splice(0, 1)
                return `rgb(${parseInt(rgb[0], 16)}, ${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)})`;
            }

            if (format === "hsl") {
                let hsl = [];

                hsl = color.match(REGEX_HSL);
                hsl.splice(0, 1)

                rgb = convertHslToRgb(hsl[0], hsl[1], hsl[2])

                return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
            }
        }

        const getHex = (format, color) => {
            let hex = [];

            if (format === "hex")
                return color

            if (format === "rgb") {
                hex = color.match(REGEX_RGB);
                hex.splice(0, 1)
                return `#${parseInt(hex[0], 10).toString(16).padStart(2, "0")}${parseInt(hex[1], 10).toString(16).padStart(2, "0")}${parseInt(hex[2], 10).toString(16).padStart(2, "0")}`.toUpperCase();
            }

            if (format === "hsl") {
                let hsl = [];

                hsl = color.match(REGEX_HSL);
                hsl.splice(0, 1)

                hex = convertHslToRgb(hsl[0], hsl[1], hsl[2])
                return `#${parseInt(hex[0], 10).toString(16).padStart(2, "0")}${parseInt(hex[1], 10).toString(16).padStart(2, "0")}${parseInt(hex[2], 10).toString(16).padStart(2, "0")}`.toUpperCase();
            }
        }

        const getHsl = (format, color) => {
            let hsl = [];

            if (format === "hsl")
                return color

            if (format === "rgb") {
                let rgb = [];

                rgb = color.match(REGEX_RGB);
                rgb.splice(0, 1)

                hsl = convertRgbToHsl(rgb[0], rgb[1], rgb[2])

                return `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%`
            }
        }

        const styleColor = {
            backgroundColor: this.state.color
        }

        return (
            <div className="color-picker">
                <input type="text" value={this.state.color} onChange={this.handleInput.bind(this)} />
                <div className="picked-color" style={styleColor}></div>
                <ConvertedColor color={getRgb(inputColorFormat(this.state.color), this.state.color)} />
                <ConvertedColor color={getHex(inputColorFormat(this.state.color), this.state.color)} />
            </div>
        );
    }
}

ReactDOM.render(<ColorPicker />, document.getElementById('app'));