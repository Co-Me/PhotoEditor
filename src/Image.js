import React from "react";

class Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: props.image,
            onChange: props.onChange,
            options: props.options
        };
    }

    applyStyle(){
        const filters = this.state.options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })

        return { filter: filters.join(' ') }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ image: nextProps.image,
                        onChange: nextProps.onChange,
                        options: nextProps.options

        });
    }

    render(){
        let a = this.applyStyle();
        return(
            <div className="image-container">
                <img className="main-image" src={this.state.image} style={a}></img>
            </div>
        );
    }
}

export {Image};
