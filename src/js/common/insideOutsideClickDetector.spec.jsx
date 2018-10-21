import InsideOutsideClickDetector from "./insideOutsideClickDetector";
import { shallow } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import simulant from "simulant";

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
    document.body.addEventListener = mockAddEventListener;
    wrapper = shallow(
      <InsideOutsideClickDetector clickHandler={mockClickHandler}>
        <div>Demo</div>
      </InsideOutsideClickDetector>
    );
    expect(mockAddEventListener).toHaveBeenCalled();
  });
});

describe("should handle document click", () => {
  let mockClickHandler = null;
  beforeEach(() => {
    mockClickHandler = jest.fn();
    ReactDOM.render(
      <div>
        <button id="outButton" />
        <InsideOutsideClickDetector clickHandler={mockClickHandler}>
          <button className="button" id="button">
            Demo
          </button>
        </InsideOutsideClickDetector>
      </div>,
      document.body
    );
  });

  it("Should detect inside click with compareDocumentPosition", done => {
    simulant.fire(document.body.querySelector("#button"), "click");
    setTimeout(() => {
      expect(mockClickHandler).toHaveBeenCalledWith(true);
      done();
    }, 3000);
  });

  it("Should detect inside click with contains", done => {
    let button = document.body.querySelector("#button");
    button.compareDocumentPosition = null;
    simulant.fire(button, "click");
    setTimeout(() => {
      expect(mockClickHandler).toHaveBeenCalledWith(true);
      done();
    }, 3000);
  });

  it("Should detect inside click with while loop", done => {
    let button = document.body.querySelector("#button");
    button.compareDocumentPosition = button.contains = null;
    simulant.fire(button, "click");
    setTimeout(() => {
      expect(mockClickHandler).toHaveBeenCalledWith(true);
      done();
    }, 3000);
  });

  it("Should detect outside click", done => {
    let button = document.body.querySelector("#outButton");
    simulant.fire(button, "click");
    setTimeout(() => {
      expect(mockClickHandler).toHaveBeenCalledWith(false);
      done();
    }, 3000);
  });
});
