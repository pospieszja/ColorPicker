import React from 'react';
import ReactDOM from 'react-dom';

const REGEX_RGB = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;
const REGEX_HEX = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/;
//const REGEX_HSL = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;

function convertToRgb(val) {
    var colors;
    if(val.match(REGEX_RGB))
    {
        return val;
    }
    
    if(val.match(REGEX_HEX))
    {
        colors = val.match(REGEX_HEX);
        colors.splice(0,1)
        return "rgb(" + parseInt(colors[0],16) + "," + parseInt(colors[1],16) + "," + parseInt(colors[2],16) +")";
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
            color: evt.target.value
        });
    }
    render() {
        const styleColor = {
            backgroundColor: this.state.color
        }
        
        const rgb = convertToRgb(this.state.color);

        return (
            <div className="color-picker">
                <input type="text" value={this.state.color} onChange={this.handleInput.bind(this)}/>
                <div className="picked-color" style={styleColor}></div>
                <p>{rgb}</p>
            </div>
        );
    }
}

ReactDOM.render(<ColorPicker />, document.getElementById('app'));