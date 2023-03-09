import React from "react";
import "./App.css";
import {Slider} from "./Slider.js";
import {SideMenu} from "./SideMenu.js";
import {Image} from "./Image.js";


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

     handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            this.setState({ image: event.target.result});
        };

        reader.readAsDataURL(file);
  };

    render() {
        return (
            <div className="image-editor">
                <div className="loading"><input type="file" onChange={e => this.handleFileChange(e)} /></div>
                <div className="main-image">
                    <Image image={this.state.image} options={this.state.options} onChange={e => this.handleFileChange(e)}></Image>
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
