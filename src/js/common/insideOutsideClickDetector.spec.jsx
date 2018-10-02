import InsideOutsideClickDetector from "./insideOutsideClickDetector";
import { shallow, mount } from "enzyme";
import React from "react";

describe("insideoutsideclickdetector component", () => {
  let wrapper,
    mockClickHandler = jest.fn(),
    testClassName = "testClass";
  beforeEach(() => {
    wrapper = shallow(
      <InsideOutsideClickDetector
        clickHandler={mockClickHandler}
        className={testClassName}
      >
        <div>Demo</div>
      </InsideOutsideClickDetector>
    );
  });
  it("should render properly", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should render properly with className", () => {
    let wrapperDiv = wrapper.find(
      `.${testClassName}.insideOutsideClickHandler-wrapper`
    );
    expect(wrapperDiv).toHaveLength(1);
  });

  it("should add click event listener on document", () => {
    const map = {};
    const mockAddEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    document.addEventListener = mockAddEventListener;
    wrapper = shallow(
      <InsideOutsideClickDetector clickHandler={mockClickHandler}>
        <div>Demo</div>
      </InsideOutsideClickDetector>
    );
    expect(mockAddEventListener).toHaveBeenCalled();
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
