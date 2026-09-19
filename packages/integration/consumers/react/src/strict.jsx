// R5 · the same blocks as package.html, on a development build.
// StrictMode only double-invokes effects when React runs its development
// build, so this page is built with --mode development (see vite.config.js).
import { Blocks } from './blocks.jsx';
import { mount } from './mount.jsx';

mount(<Blocks />);
