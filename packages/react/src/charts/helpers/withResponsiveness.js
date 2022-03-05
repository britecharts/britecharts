import React from 'react';
import optimizedResize from './optimizedResize.js';

export default function (Component) {
    return class WithResponsiveness extends React.PureComponent {
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
            const width = this.rootNode.clientWidth;

            if (width !== this.state.width) {
                this.setState({
                    width,
                });
            }
        }

        render() {
            return (
                <div className="responsive-container" ref={this.setRef}>
                    <Component width={this.state.width} {...this.props} />
                </div>
            );
        }
    };
}
