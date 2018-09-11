import ReactDateRangePicker from '.';
import { shallow } from 'enzyme';
import React from 'react';

describe('daterangepicker component', () => { 
    it('should render properly', () => {
        const wrapper = shallow(<ReactDateRangePicker />);
        expect(wrapper.length).toBe(1);
    });
})