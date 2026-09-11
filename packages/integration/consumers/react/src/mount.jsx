import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// StrictMode on purpose: React 18+ mounts, unmounts and remounts every
// component in development, which is exactly what exercises the wrappers'
// create/update/destroy lifecycle.
export function mount(element) {
    createRoot(document.getElementById('root')).render(<StrictMode>{element}</StrictMode>);
}
