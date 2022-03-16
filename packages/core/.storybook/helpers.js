export const getCleanContainer = () => {
    const result = document.querySelector('.container');
    const wrapper = document.createElement('div');
    wrapper.classList = 'chart-container';

    result.innerHTML = '';
    result.appendChild(wrapper);

    return wrapper;
};
