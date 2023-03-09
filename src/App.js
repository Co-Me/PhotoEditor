import React from "react";
//import "./App.css";

class Image extends React.Component {

    render(){
        return(
            <div>
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
    render(){
        return(
            <div className="slider-container">
                <input type="range" className="slider" min={this.state.min} max={this.state.max} value={this.state.value} onChange={this.state.onChange}/>
            </div>
        );
    }
}

class SideMenu extends React.Component {
    render(){
        return(
            <div>SideMenu</div>
        );
    }
}

class SideMenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: props.active,
            onClick: props.onClick,
        };
    }

    render(){
        return(
            <button className={this.state.active === true ? "side-menu-item-active" : "side-menu-item"} onclick={this.state.oncClick}>
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
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]

class ImageEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            options: DEFAULT_OPTIONS,
            activeOption: 0,
        };
    }
    handleSliderChange(value){
        console.log(value);
    };

    render() {
        return (
            <div className="image-editor">
                <div className="image">
                    <Image />
                </div>
                <div className="side-menu">
                    <SideMenu />
                </div>
                <div className="slider">
                    <Slider min="0" max="100" value="30" onChange={e => this.handleSliderChange(e.target.value)}></Slider>
                </div>
            </div>
        );
    }
}

export {ImageEditor};
