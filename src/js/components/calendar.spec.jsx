import Calendar from "@components/calendar";
import { shallow } from "enzyme";
import React from "react";

describe("Calendar component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Calendar />);
  });

  it("should render properly", () => {
    expect(wrapper).toHaveLength(1);
  });
});
