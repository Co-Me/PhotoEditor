import React from "react";
import "./App.css";

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
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: props.activeIndex,
            options: props.options,
            onClick: props.onClick
        };
    }
    render(){
        return(
            this.state.options.map((option, index) => {
                return (
                    <SideMenuItem
                        name={option.name}
                        key = {index}
                        id = {index}
                        active={this.state.activeIndex === index}
                        onClick={e => this.state.onClick(e)}
                    />
                )
            }
            )
        );
    }
}

class SideMenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            key: props.id,
            id: props.id,
            active: props.active,
            onClick: props.onClick
        };
    }

    render(){
        return(
            <button className={this.state.active === true ? "side-menu-item-active" : "side-menu-item"} onClick={e => this.state.onClick(e)}>
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
        };
    }

    handleSideMenuItemClick(event){
        this.setState({activeIndex: event.target.id});
        console.log(event.target);
    }

    handleSliderChange(event){
        const nextOptions = this.state.options.map((c, i) => {
            if (i === this.state.activeIndex)
                c.value = event.target.value;
            return c;
        });
        this.setState({
            options: nextOptions
        });

        console.log(this.state.options[this.state.activeIndex].value);
    };

    render() {
        return (
            <div className="image-editor">
                <div className="image">
                    <Image />
                </div>
                <div className="side-menu">
                    <SideMenu activeIndex={this.state.activeIndex} options={this.state.options} onClick={e => this.handleSideMenuItemClick(e)}></SideMenu>
                </div>
                <div className="slider">
                    <Slider min={this.state.options[this.state.activeIndex].range.min}
                            max={this.state.options[this.state.activeIndex].range.max}
                            value={this.state.options[this.state.activeIndex].value}
                            onChange={e => this.handleSliderChange(e)}></Slider>
                </div>
            </div>
        );
    }
}

export {ImageEditor};
