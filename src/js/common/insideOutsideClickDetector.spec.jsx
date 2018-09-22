import InsideOutsideClickDetector from "./insideOutsideClickDetector";
import { shallow, mount } from "enzyme";
import React from "react";

describe("insideoutsideclickdetector component", () => {
  it("should render properly", () => {
    const wrapper = shallow(
      <InsideOutsideClickDetector>
        <div>Demo</div>
      </InsideOutsideClickDetector>
    );
    expect(wrapper).toHaveLength(1);
  });

  describe("should handle document click", () => {
    let wrapper,
      mockClickHandler = jest.fn();
    beforeEach(() => {
      wrapper = mount(
        <InsideOutsideClickDetector clickHandler={mockClickHandler}>
          <button className="button" id="button">
            Demo
          </button>
        </InsideOutsideClickDetector>
      );
    });

    it("Should detect inside click with compareDocumentPosition", () => {
      const button = wrapper.find("#button");
      expect(button).toHaveLength(1);
      button.simulate("click");
      expect(mockClickHandler).toHaveBeenCalledWith(true);
    });

    it("Should detect inside click with contains", () => {
      const button = wrapper.find("#button");
      expect(button).toHaveLength(1);
      wrapper.instance().node.compareDocumentPosition = undefined;
      button.simulate("click");
      expect(mockClickHandler).toHaveBeenCalledWith(true);
    });

    it("Should detect inside click with while loop", () => {
      const button = wrapper.find("#button");
      expect(button).toHaveLength(1);
      wrapper.instance().node.compareDocumentPosition = wrapper.instance().node.contains = undefined;
      button.simulate("click");
      expect(mockClickHandler).toHaveBeenCalledWith(true);
    });
  });
});
