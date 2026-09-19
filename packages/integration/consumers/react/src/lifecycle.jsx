// R6 · create, destroy and create again, driven by hand rather than by
// StrictMode, so it works on a production build. Everything happens
// synchronously; the result is left on <body data-lifecycle> for the test.
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Blocks } from './blocks.jsx';

const container = document.getElementById('root');
const svgCount = () => document.querySelectorAll('svg').length;

let root = createRoot(container);

flushSync(() => root.render(<Blocks />));
const drawn = svgCount();

root.unmount();
const afterUnmount = svgCount();

root = createRoot(container);
flushSync(() => root.render(<Blocks />));

document.body.dataset.lifecycle = JSON.stringify({
    drawn,
    afterUnmount,
    remounted: svgCount(),
});
