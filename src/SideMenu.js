import React from "react";

class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: props.activeIndex,
            options: props.options,
            onClick: props.onClick
        };
    }

    /**
   * Обновление состояние элемента при обновлении состояния в родительском элементе
   *
   * @param nextProps - свойства, переданные из родительского элемента
   * @param prevState - предыдущее состояние
   */
    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.activeIndex !== prevState.activeIndex)
            return ({
                activeIndex: nextProps.activeIndex,
                options: nextProps.options,
            });
    }


    render(){
        return(
            this.state.options.map((option, index) => {
                console.log(index, this.state.activeIndex);
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

    /**
   * Обновление состояние элемента при обновлении состояния в родительском элементе
   *
   * @param nextProps - свойства, переданные из родительского элемента
   * @param prevState - предыдущее состояние
   */
    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.active !== prevState.active)
            return ({
                active: nextProps.active,
            });
    }

    render(){
        return(
            <button id={this.state.id} className={this.state.active === true ? "side-menu-item-active" : "side-menu-item"} onClick={this.state.onClick}>
                {this.state.name}
            </button>
        )
    }
}

export {SideMenu};
export {SideMenuItem};
