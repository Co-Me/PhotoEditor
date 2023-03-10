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

    /**
   * Обновление состояние элемента при обновлении состояния в родительском элементе
   *
   * @remarks
   * Устанавливает значение id кликнутого элемента, как значение штвукса активного элемента (activeIndex)
   *
   * @param nextProps - свойства, переданные из родительского элемента
   * @param prevState - предыдущее состояние
   */
    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.value !== prevState.value)
            return ({
                min: nextProps.min,
                max: nextProps.max,
                value: nextProps.value
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

export {Slider};
