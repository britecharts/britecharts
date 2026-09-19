import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// StrictMode is harmless on a production build and is what a user's app
// wraps around us. It only does anything in a development build, where React
// 18+ runs every effect's setup, cleanup and setup again on mount: that is
// what exercises the wrappers' create/destroy lifecycle. The pages the
// production preview serves never see it; strict.html is built in
// development mode for exactly that reason (see vite.config.js).
export function mount(element) {
    createRoot(document.getElementById('root')).render(<StrictMode>{element}</StrictMode>);
}
