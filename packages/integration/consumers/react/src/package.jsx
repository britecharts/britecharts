// R1/R2 · the package entry. With the exports map every bundler condition
// resolves to the UMD bundle, so named imports go through CommonJS interop.
import { Blocks } from './blocks.jsx';
import { mount } from './mount.jsx';

mount(<Blocks />);
