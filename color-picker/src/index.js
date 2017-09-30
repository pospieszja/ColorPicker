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
            if (REGEX_HSL.test(color))
                return "hsl";
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

            if (format === "hsl") {
                let hsl = [];
                let h, s, l;
                let c, x, m;
                let r, g, b;

                hsl = color.match(REGEX_HSL)
                hsl.splice(0, 1)

                h = hsl[0];
                s = hsl[1] / 100;
                l = hsl[2] / 100;

                c = (1 - Math.abs(2 * l - 1)) * s;
                x = c * (1 - Math.abs((h / 60) % 2 - 1))
                m = l - c / 2

                if (h >= 0 && h < 60) {
                    r = c;
                    b = x;
                    g = 0;
                }

                if (h >= 60 && h < 120) {
                    r = x;
                    b = c;
                    g = 0;
                }

                if (h >= 120 && h < 180) {
                    r = 0;
                    b = c;
                    g = x;
                }

                if (h >= 180 && h < 240) {
                    r = 0;
                    b = x;
                    g = c;
                }

                if (h >= 240 && h < 300) {
                    r = x;
                    b = 0;
                    g = c;
                }

                if (h >= 300 && h < 360) {
                    r = c;
                    b = 0;
                    g = x;
                }

                return `rgb(${Math.round((r + m) * 255)}, ${Math.round((b + m) * 255)}, ${Math.round((g + m) * 255)})`
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