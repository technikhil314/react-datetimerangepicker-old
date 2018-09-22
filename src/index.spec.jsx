import ReactDateRangePicker from ".";
import { shallow } from "enzyme";
import React from "react";

describe("daterangepicker component", () => {
  it("should render properly", () => {
    const wrapper = shallow(<ReactDateRangePicker />);
    expect(wrapper).toHaveLength(1);
  });

  describe("should set state.showFlyout properly when insideOutSideClickHandler is called", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ReactDateRangePicker />);
    });

    it("should set the value to true when inside click is true", () => {
      wrapper.instance().insideOutSideClickHandler(true);
      expect(wrapper.state("showFlyout")).toEqual(true);
    });

    it("should set the value to false when inside click is true", () => {
      wrapper.instance().insideOutSideClickHandler(false);
      expect(wrapper.state("showFlyout")).toEqual(false);
    });
  });
});
