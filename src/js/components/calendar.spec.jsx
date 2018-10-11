import Calendar from "@components/calendar";
import { shallow } from "enzyme";
import React from "react";
import moment from "moment";
describe("Calendar component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Calendar />);
  });

  it("should render properly", () => {
    expect(wrapper).toHaveLength(1);
  });
});

describe("should set state based on props passed", () => {
  let wrapper;
  it("should set state based on current date if date is not passed in props", () => {
    wrapper = shallow(<Calendar />);
    expect(wrapper.state("monthName")).toBe(moment().format("MMM"));
    expect(wrapper.state("month")).toBe(
      parseInt(moment().format("MM"), 10) - 1
    );
    expect(wrapper.state("year")).toBe(parseInt(moment().format("YYYY"), 10));
  });

  it("should set state based on passed date", () => {
    wrapper = shallow(<Calendar date="03/04/2015" format="DD/MM/YYYY" />);
    expect(wrapper.state("monthName")).toBe("Apr");
    expect(wrapper.state("month")).toBe(3);
    expect(wrapper.state("year")).toBe(2015);
  });
});

describe("Call backs should set state properly", () => {
  let wrapper;
  const getWrapper = (date, format) => {
    return shallow(<Calendar date={date} format={format} />);
  };

  it("should increase month and year", () => {
    wrapper = getWrapper("03.12.1990", "DD.MM.YYYY");
    wrapper.instance().onMonthChange(1);
    expect(wrapper.state("monthName")).toBe("Jan");
    expect(wrapper.state("month")).toBe(0);
    expect(wrapper.state("year")).toBe(1991);
  });

  it("should increase month and year by 3", () => {
    wrapper = getWrapper("03.12.1990", "DD.MM.YYYY");
    wrapper.instance().onMonthChange(3);
    expect(wrapper.state("monthName")).toBe("Mar");
    expect(wrapper.state("month")).toBe(2);
    expect(wrapper.state("year")).toBe(1991);
  });

  it("should decrease month and year by 3", () => {
    wrapper = getWrapper("03.01.1995", "DD.MM.YYYY");
    wrapper.instance().onMonthChange(-3);
    expect(wrapper.state("monthName")).toBe("Oct");
    expect(wrapper.state("month")).toBe(9);
    expect(wrapper.state("year")).toBe(1994);
  });

  it("should decrease month and year", () => {
    wrapper = getWrapper("03.01.1995", "DD.MM.YYYY");
    wrapper.instance().onMonthChange(-1);
    expect(wrapper.state("monthName")).toBe("Dec");
    expect(wrapper.state("month")).toBe(11);
    expect(wrapper.state("year")).toBe(1994);
  });

  it("should decrease year", () => {
    wrapper = getWrapper("03.01.1995", "DD.MM.YYYY");
    wrapper.instance().onYearChange(-1);
    expect(wrapper.state("monthName")).toBe("Jan");
    expect(wrapper.state("month")).toBe(0);
    expect(wrapper.state("year")).toBe(1994);
  });

  it("should increase year", () => {
    wrapper = getWrapper("03.01.1995", "DD.MM.YYYY");
    wrapper.instance().onYearChange(1);
    expect(wrapper.state("monthName")).toBe("Jan");
    expect(wrapper.state("month")).toBe(0);
    expect(wrapper.state("year")).toBe(1996);
  });
});

describe("onDateSelected method", () => {
  let wrapper,
    onDateSelectedMock = jest.fn();
  const getWrapper = (date, format) => {
    return shallow(
      <Calendar
        onDateSelected={onDateSelectedMock}
        date={date}
        format={format}
      />
    );
  };

  it("should set the state properly and call callback", () => {
    const selectedDate = moment("12/01/2018", "DD/MM/YYYY");
    wrapper = getWrapper(moment("11/12/2016", "DD/MM/YYYY"), "DD/MM/YYYY");
    wrapper.instance().onDateSelected(selectedDate)();
    expect(wrapper.state("monthName")).toBe("Jan");
    expect(wrapper.state("month")).toBe(0);
    expect(wrapper.state("year")).toBe(2018);
    expect(onDateSelectedMock).toBeCalledWith(selectedDate);
  });
});
