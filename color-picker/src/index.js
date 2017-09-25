import React from 'react';
import ReactDOM from 'react-dom';

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

        return (
            <div className="color-picker">
                <input type="text" value={this.state.color} onChange={this.handleInput.bind(this)}/>
                <div className="picked-color" style={styleColor}></div>
            </div>
        );
    }

}

ReactDOM.render(<ColorPicker />, document.getElementById('app'));
