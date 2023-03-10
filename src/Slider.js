import React from "react";

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            min: props.min,
            max: props.max,
            value: props.value,
            onChange: props.onChange,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value,
                        min: nextProps.min,
                        max: nextProps.max,
        });
    }

    renderImage(){

    }

    render(){
        return(
            <div className="slider-container">
                <input type="range" className="slider" min={this.state.min} max={this.state.max} value={this.state.value} onChange={this.state.onChange}/>
            </div>
        );
    }
}

export {Slider};
