import React from 'react';
import ReactDOM from 'react-dom';

import { convertHslToRgb } from './helpers.js'
import { convertRgbToHsl } from './helpers.js'


class ConvertedColor extends React.Component {
    render() {
        return (
            <p className={this.props.class}>
                {this.props.color}
            </p>
        )
    }
}

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            color: ""
        }
    }

    handleInput(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    handleSubmit(event) {
        this.setState({
            color: this.state.inputValue.replace(/\s/g, '')
        })
        event.preventDefault();
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
                return `rgb(${parseInt(rgb[0], 16)},${parseInt(rgb[1], 16)},${parseInt(rgb[2], 16)})`;
            }

            if (format === "hsl") {
                let hsl = [];

                hsl = color.match(REGEX_HSL);
                hsl.splice(0, 1)

                rgb = convertHslToRgb(hsl[0], hsl[1], hsl[2])

                return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
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
                hsl.splice(0, 1);

                hex = convertHslToRgb(hsl[0], hsl[1], hsl[2]);
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
                rgb.splice(0, 1);
                
                hsl = convertRgbToHsl(rgb[0], rgb[1], rgb[2]);

                return `hsl(${Math.round(hsl[0]*60)},${Math.round(hsl[1] * 100)}%,${Math.round(hsl[2] * 100)}%)`;
            }

            if (format === "hex") {
                let rgb = [];

                rgb = color.match(REGEX_HEX);
                rgb.splice(0, 1);
                rgb = rgb.map(c => parseInt(c, 16));

                hsl = convertRgbToHsl(rgb[0], rgb[1], rgb[2]);

                return `hsl(${Math.round(hsl[0]*60)},${Math.round(hsl[1] * 100)}%,${Math.round(hsl[2] * 100)}%)`;
            }
        }

        const styleColor = {
            backgroundColor: this.state.color
        }

        return (
            <div className="wrapper">
                <div className="wrapper-input">
                    <h1>Enter a color</h1>
                    <form className="color-form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="button-input">
                            <input type="text" value={this.state.inputValue} onChange={this.handleInput.bind(this)} />
                            <button type="submit" >OK</button>
                        </div>
                    </form>
                </div>
                <div className="wrapper-output">
                    <h1>Selected Color</h1>
                    <div className="color-display" style={styleColor}></div>
                    {inputColorFormat(this.state.color) && <ConvertedColor class="rgb-output" color={getRgb(inputColorFormat(this.state.color), this.state.color)} />}
                    {inputColorFormat(this.state.color) && <ConvertedColor class="hex-output" color={getHex(inputColorFormat(this.state.color), this.state.color)} />}
                    {inputColorFormat(this.state.color) && <ConvertedColor class="hsl-output" color={getHsl(inputColorFormat(this.state.color), this.state.color)} />}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ColorPicker />, document.getElementById('app'));