import React from "react";
import "./App.css";
import {Slider} from "./Slider.js";
import {SideMenu} from "./SideMenu.js";


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
            image: null,
            canvas: null,
            activeIndex: 0,
            options: DEFAULT_OPTIONS
        };
    }

    handleSideMenuItemClick(event){
        this.setState({activeIndex: Number(event.target.id)});
        console.log(this.state.activeIndex);
    }

    handleSliderChange(event){
        let nextOptions = []
        for (let i = 0; i < this.state.options.length; i++) {
            nextOptions.push(this.state.options[i]);
        }

        nextOptions[this.state.activeIndex].value = event.target.value;
        this.setState({ options: nextOptions });

        this.applyFilter();
    };

    handleFileChange(event) {
        const newImage = new Image();
        newImage.src = URL.createObjectURL(event.target.files[0]);
        newImage.onload = () => {
            const newCanvas = document.getElementById('canvas');
            newCanvas.width = newImage.width;
            newCanvas.height = newImage.height;
            const context = newCanvas.getContext('2d');
            context.drawImage(newImage, 0, 0);
            this.setState({image: newImage, canvas: newCanvas });
        };
    };

    applyFilter(){
        const filters = this.state.options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        const a = filters.join(' ');

        const context = this.state.canvas.getContext('2d');
        context.filter = a;
        context.drawImage(this.state.image, 0, 0);
    }

    saveImage(){
        const canvas = this.state.canvas;
        const link = document.createElement('a');
        link.download = 'my-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    render() {
        return (
            <div className="image-editor">
                <div className="loading">
                    <input type="file" id="file-input" onChange={e => this.handleFileChange(e)} />
                    <button onClick={() => this.saveImage()}>Save image</button>
                </div>
                <div className="main-image">
                    <canvas id="canvas"/>
                </div>
                <div className="side-menu">
                    <SideMenu
                        activeIndex={this.state.activeIndex}
                        options={this.state.options}
                        onClick={e => this.handleSideMenuItemClick(e)}>
                    </SideMenu>
                </div>
                <div className="slider">
                    <Slider min={this.state.options[this.state.activeIndex].min}
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
