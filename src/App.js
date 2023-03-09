import React from "react";
import "./App.css";

class Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: props.image
        };
    }

    render(){
        return(
            <div className="main-image">
                <p>Image</p>
            </div>
        );
    }
}

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

    render(){
        return(
            <div className="slider-container">
                <input type="range" className="slider" min={this.state.min} max={this.state.max} value={this.state.value} onChange={this.state.onChange}/>
            </div>
        );
    }
}

class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: props.activeIndex,
            options: props.options,
            onClick: props.onClick
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ activeIndex: nextProps.activeIndex, options: nextProps.options});
    }

    render(){
        return(
            this.state.options.map((option, index) => {
                return (
                    <SideMenuItem
                        key = {index}
                        name={option.name}
                        id = {index}
                        active={this.state.activeIndex === index}
                        onClick={this.state.onClick}
                    />
                )
            })
        );
    }
}

class SideMenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: props.id,
            name: props.name,
            id: props.id,
            active: props.active,
            onClick: props.onClick
        };
    }

        componentWillReceiveProps(nextProps) {
        this.setState({ active: nextProps.active});
    }

    render(){
        return(
            <button id={this.state.id} className={this.state.active === true ? "side-menu-item-active" : "side-menu-item"} onClick={this.state.onClick}>
                {this.state.name}
            </button>
        )
    }
}

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    min: 0,
    max: 200,
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    min: 0,
    max: 200,
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    min: 0,
    max: 200,
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
      min: 0,
      max: 100,
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    min: 0,
    max: 100,
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    min: 0,
    max: 360,
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    min: 0,
    max: 20,
    unit: 'px'
  }
]

class ImageEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            options: DEFAULT_OPTIONS,
            image: null
        };
    }

    handleSideMenuItemClick(event){
        this.setState({activeIndex: event.target.id});
    }

    handleSliderChange(event){
        let nextOptions = []
        for (let i = 0; i < this.state.options.length; i++) {
            nextOptions.push(this.state.options[i]);
        }

        nextOptions[this.state.activeIndex].value = event.target.value;
        this.setState({ options: nextOptions });
    };

    render() {
        return (
            <div className="image-editor">
                <div className="image">
                    <Image />
                </div>
                <div className="side-menu">
                    <SideMenu
                        activeIndex={this.state.activeIndex}
                        options={this.state.options}
                        onClick={e => this.handleSideMenuItemClick(e)}>
                    </SideMenu>
                </div>
                <div className="slider">
                    <Slider id="s" min={this.state.options[this.state.activeIndex].min}
                            max={this.state.options[this.state.activeIndex].max}
                            value={this.state.options[this.state.activeIndex].value}
                            onChange={e => this.handleSliderChange(e)}>
                    </Slider>
                </div>
            </div>
        );
    }
}

export {ImageEditor};
