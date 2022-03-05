import React, { Component } from 'react';
import PropTypes from 'prop-types';

import optimizedResize from './optimizedResize.js';

export default class ResponsiveContainer extends Component {
    static propTypes = {
        render: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.setRef = this.setRef.bind(this);
        this.updateSize = this.updateSize.bind(this);
    }

    state = {
        width: 500,
    };

    componentDidMount() {
        optimizedResize.addHorizontal(this.updateSize);

        this.updateSize();
    }

    componentWillUnmount() {
        optimizedResize.clearAll();

        this.updateSize();
    }

    setRef(componentNode) {
        this.rootNode = componentNode;
    }

    updateSize() {
        if (this.rootNode) {
            const width = this.rootNode.clientWidth;

            if (width !== this.state.width) {
                this.setState({
                    width,
                });
            }
        }
    }

    render() {
        const { render } = this.props;
        return (
            <div className="responsive-container" ref={this.setRef}>
                {render({ width: this.state.width })}
            </div>
        );
    }
}
