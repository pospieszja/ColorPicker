import React from 'react';
import ReactDOM from 'react-dom';

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
        };

        const convertToRgb = (format, color) => {
            let rgb = [];

            if (format === "rgb")
                return color

            if (format === "hex") {
                rgb = color.match(REGEX_HEX);
                rgb.splice(0, 1)
                return `rgb(${parseInt(rgb[0], 16)}, ${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)})`;
            }
        }

        const convertToHex = (format, color) => {
            let hex = [];

            if (format === "hex")
                return color

            if (format === "rgb") {
                hex = color.match(REGEX_RGB);
                hex.splice(0, 1)
                return `#${parseInt(hex[0], 10).toString(16)}${parseInt(hex[1], 10).toString(16)}${parseInt(hex[2], 10).toString(16)}`.toUpperCase();
            }
        }

        const styleColor = {
            backgroundColor: this.state.color
        }

        return (
            <div className="color-picker">
                <input type="text" value={this.state.color} onChange={this.handleInput.bind(this)} />
                <div className="picked-color" style={styleColor}></div>
                <ConvertedColor color={convertToRgb(inputColorFormat(this.state.color), this.state.color)} />
                <ConvertedColor color={convertToHex(inputColorFormat(this.state.color), this.state.color)} />
            </div>
        );
    }
}

ReactDOM.render(<ColorPicker />, document.getElementById('app'));