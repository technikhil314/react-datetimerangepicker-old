import InsideOutsideClickDetector from "./insideOutsideClickDetector";
import { shallow } from "enzyme";
import React from "react";

describe("daterangepicker component", () => {
  it("should render properly", () => {
    const wrapper = shallow(<InsideOutsideClickDetector />);
    expect(wrapper.length).toBe(1);
  });
});
