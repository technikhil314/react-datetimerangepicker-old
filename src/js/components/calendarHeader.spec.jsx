import React from "react";
import CalendarHeader from "@components/calendarHeader";
import { shallow } from "enzyme";
describe("calendar header component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CalendarHeader />);
  });

  it("should render properly", () => {
    expect(wrapper).toHaveLength(1);
  });
});

describe("should call passed callbacks", () => {
  let wrapper,
    onMonthChangeMock = jest.fn(),
    onYearChangeMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <CalendarHeader
        name="mockName"
        onMonthChange={onMonthChangeMock}
        onYearChange={onYearChangeMock}
      />
    );
  });
  it("should call year change callback with -1", () => {
    let prevYearButton = wrapper.find(".calendarHeader__prev-year");
    prevYearButton.simulate("click");
    expect(onYearChangeMock).toHaveBeenCalledWith(-1);
  });
  it("should call year change callback with 1", () => {
    let prevYearButton = wrapper.find(".calendarHeader__next-year");
    prevYearButton.simulate("click");
    expect(onYearChangeMock).toHaveBeenCalledWith(1);
  });
  it("should call month change callback with 1", () => {
    let prevYearButton = wrapper.find(".calendarHeader__next-month");
    prevYearButton.simulate("click");
    expect(onMonthChangeMock).toHaveBeenCalledWith(1);
  });
  it("should call month change callback with -1", () => {
    let prevYearButton = wrapper.find(".calendarHeader__prev-month");
    prevYearButton.simulate("click");
    expect(onMonthChangeMock).toHaveBeenCalledWith(-1);
  });
});
