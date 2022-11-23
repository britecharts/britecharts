import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.spyOn(console, 'warn').mockImplementation(() => {});

// This fixes a problem with the wrapTextWithEllipses function in britecharts
// using getComputedTextLength and not being available because of jsdom.
// More info in https://github.com/britecharts/britecharts-react/pull/65#issuecomment-348726423
if (!window.SVGElement) {
    window.SVGElement = {};
}

window.SVGElement.prototype.getBBox = () => ({
    x: 0,
    y: 0,
});
window.SVGElement.prototype.getComputedTextLength = () => 200;
