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

describe("daterangepicker options tester", () => {
  const shallowRenderWithOptions = options => {
    return shallow(<ReactDateRangePicker options={options} />);
  };
  describe("options.open", () => {
    it("should not have open classes in html", () => {
      const wrapper = shallowRenderWithOptions({
        open: "left"
      });
      expect(wrapper.find(".daterangepicker__flyout")).toHaveLength(1);
      expect(wrapper.find(".daterangepicker__flyout-open-left")).toHaveLength(
        0
      );
    });

    it("should have open classes in html when state.showflyout is true", () => {
      const wrapper = shallowRenderWithOptions({
        open: "left"
      });
      wrapper.setState({
        showFlyout: true
      });
      wrapper.update();
      expect(wrapper.find(".daterangepicker__flyout")).toHaveLength(1);
      expect(wrapper.find(".daterangepicker__flyout-open-left")).toHaveLength(
        1
      );
    });
  });
});
