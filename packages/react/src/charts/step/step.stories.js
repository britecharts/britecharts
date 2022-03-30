import React from 'react';

import Step from './Step';
import stepData from './stepChart.fixtures';

export default {
    title: 'Charts/Step',
    component: Step,
};

export const WithDefaultProperties = () => {
    const data = stepData.firstDataMethod();

    return <Step data={data} />;
};

export const WithLoadingState = () => {
    const data = [];

    return <Step data={data} isLoading={true} />;
};
