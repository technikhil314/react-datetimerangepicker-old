import ReactDateRangePicker from ".";
import { shallow } from "enzyme";
import React from "react";
import moment from "moment";
describe("daterangepicker component", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    wrapper = shallow(<ReactDateRangePicker options={options} />);
  });
  it("should render properly", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should disable apply/clear button", () => {
    const getApplyButton = () => {
      return wrapper.find(".daterangepicker__control--apply");
    };
    const getClearButton = () => {
      return wrapper.find(".daterangepicker__control--clear");
    };
    let applyButton, clearButton;
    wrapper.setState({
      fromDate: undefined,
      toDate: undefined
    });
    wrapper.update();
    applyButton = getApplyButton();
    clearButton = getClearButton();
    expect(applyButton.prop("disabled")).toBe(true);
    expect(clearButton.prop("disabled")).toBe(true);

    wrapper.setState({
      fromDate: undefined,
      toDate: moment()
    });
    wrapper.update();
    applyButton = getApplyButton();
    clearButton = getClearButton();
    expect(applyButton.prop("disabled")).toBe(true);
    expect(clearButton.prop("disabled")).toBe(true);

    wrapper.setState({
      fromDate: moment(),
      toDate: undefined
    });
    wrapper.update();
    applyButton = getApplyButton();
    clearButton = getClearButton();
    expect(applyButton.prop("disabled")).toBe(true);
    expect(clearButton.prop("disabled")).toBe(true);
  });

  it("should not disable apply/clear button", () => {
    const getApplyButton = () => {
      return wrapper.find(".daterangepicker__control--apply");
    };
    const getClearButton = () => {
      return wrapper.find(".daterangepicker__control--clear");
    };
    let applyButton, clearButton;
    wrapper.setState({
      fromDate: moment(),
      toDate: moment()
    });
    wrapper.update();
    applyButton = getApplyButton();
    clearButton = getClearButton();
    expect(applyButton.prop("disabled")).toBe(false);
    expect(clearButton.prop("disabled")).toBe(false);
  });

  it("should disable cancel button", () => {
    const getCancelButton = () => {
      return wrapper.find(".daterangepicker__control--cancel");
    };
    let cancelButton;
    cancelButton = getCancelButton();
    expect(cancelButton.prop("disabled")).toBe(true);

    wrapper.instance().backupOldDates();
    wrapper.update();
    cancelButton = getCancelButton();
    expect(cancelButton.prop("disabled")).toBe(true);

    wrapper.setState({
      rangeIsDirty: false
    });
    wrapper.update();
    cancelButton = getCancelButton();
    expect(cancelButton.prop("disabled")).toBe(true);
  });

  it("should not disable cancel button", () => {
    const getCancelButton = () => {
      return wrapper.find(".daterangepicker__control--cancel");
    };
    let cancelButton;
    wrapper.instance().backupOldDates();
    wrapper.setState({
      rangeIsDirty: true
    });
    wrapper.update();
    cancelButton = getCancelButton();
    expect(cancelButton.prop("disabled")).toBe(false);
  });
});

describe("should set state.showFlyout properly when insideOutSideClickHandler is called", () => {
  let wrapper,
    options = {};
  beforeEach(() => {
    options.onRangeSelected = jest.fn();
    wrapper = shallow(<ReactDateRangePicker options={options} />);
  });

  it("should set the value to true when inside click is true", () => {
    wrapper.instance().insideOutSideClickHandler(true);
    expect(wrapper.state("showFlyout")).toEqual(true);
  });

  it("should set the value to false when showFlyout is false", () => {
    wrapper.setState({
      showFlyout: true
    });
    wrapper.instance().insideOutSideClickHandler(false);
    expect(wrapper.state("showFlyout")).toEqual(false);
  });

  it("should set the value to false when inside click is false", () => {
    wrapper.instance().insideOutSideClickHandler(false);
    expect(wrapper.state("showFlyout")).toEqual(false);
  });

  it("should backup old dates when opening the flyout if not already backed up", () => {
    wrapper.setState({
      fromDate: "dummyFromDate",
      toDate: "dummyToDate"
    });
    const spy = jest.spyOn(wrapper.instance(), "backupOldDates");
    wrapper.instance().insideOutSideClickHandler(true);
    expect(wrapper.instance().oldFromDate).toEqual("dummyFromDate");
    expect(wrapper.instance().oldToDate).toEqual("dummyToDate");
    expect(wrapper.instance().oldDatesStored).toEqual(true);
    expect(spy).toBeCalledTimes(1);
  });

  it("should not backup old dates when opening the flyout if already backed up", () => {
    wrapper.setState({
      fromDate: "dummyFromDate1",
      toDate: "dummyToDate1"
    });
    wrapper.instance().oldDatesStored = true;
    wrapper.instance().oldFromDate = "dummyFromDate2";
    wrapper.instance().oldToDate = "dummyToDate2";
    const spy = jest.spyOn(wrapper.instance(), "backupOldDates");
    wrapper.instance().insideOutSideClickHandler(true);
    expect(wrapper.instance().oldFromDate).toEqual("dummyFromDate2");
    expect(wrapper.instance().oldToDate).toEqual("dummyToDate2");
    expect(wrapper.instance().oldDatesStored).toEqual(true);
    expect(spy).not.toHaveBeenCalled();
  });
});

describe("options.open tests", () => {
  const shallowRenderWithOptions = options => {
    options.onRangeSelected = jest.fn();
    return shallow(<ReactDateRangePicker options={options} />);
  };
  it("should not have open classes in html", () => {
    const wrapper = shallowRenderWithOptions({
      open: "left"
    });
    expect(wrapper.find(".daterangepicker__flyout")).toHaveLength(1);
    expect(wrapper.find(".daterangepicker__flyout-open-left")).toHaveLength(0);
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
    expect(wrapper.find(".daterangepicker__flyout-open-left")).toHaveLength(1);
  });
});

describe("should set range if startDate and endDate is passed as props", () => {
  const shallowRenderWithOptions = options => {
    options.onRangeSelected = jest.fn();
    return shallow(<ReactDateRangePicker options={options} />);
  };

  it("if dates are passed as moment objects", () => {
    const options = {
      startDate: moment("12|03|2017", "DD|MM|YYYY"),
      endDate: moment("12|03|2017", "DD|MM|YYYY"),
      format: "DD|MM|YYYY"
    };
    const wrapper = shallowRenderWithOptions(options);
    expect(wrapper.state("selectedRange")).toBe("12|03|2017 - 12|03|2017");
    expect(options.onRangeSelected).toBeCalledTimes(1);
  });

  it("if dates are passed as strings", () => {
    const options = {
      startDate: "12|03|2017",
      endDate: "12|03|2017",
      format: "DD|MM|YYYY"
    };
    const wrapper = shallowRenderWithOptions(options);
    expect(wrapper.state("selectedRange")).toBe("12|03|2017 - 12|03|2017");
    expect(options.onRangeSelected).toBeCalledTimes(1);
  });
});

describe("should not set range if startDate or endDate is not passed as props", () => {
  const shallowRenderWithOptions = options => {
    options.onRangeSelected = jest.fn();
    return shallow(<ReactDateRangePicker options={options} />);
  };

  it("if startDate is passed as moment objects", () => {
    const options = {
      startDate: undefined,
      endDate: moment("12|03|2017", "DD|MM|YYYY"),
      format: "DD|MM|YYYY"
    };
    const wrapper = shallowRenderWithOptions(options);
    expect(wrapper.state("selectedRange")).toBe("");
    expect(options.onRangeSelected).toBeCalledTimes(0);
  });

  it("if endDate is passed as moment objects", () => {
    const options = {
      startDate: moment("12|03|2017", "DD|MM|YYYY"),
      endDate: undefined,
      format: "DD|MM|YYYY"
    };
    const wrapper = shallowRenderWithOptions(options);
    expect(wrapper.state("selectedRange")).toBe("");
    expect(options.onRangeSelected).toBeCalledTimes(0);
  });

  it("if endDate is passed as strings", () => {
    const options = {
      startDate: "",
      endDate: "12|03|2017",
      format: "DD|MM|YYYY"
    };
    const wrapper = shallowRenderWithOptions(options);
    expect(wrapper.state("selectedRange")).toBe("");
    expect(options.onRangeSelected).toBeCalledTimes(0);
  });

  it("if startDate is passed as strings", () => {
    const options = {
      startDate: "12|03|2017",
      endDate: "",
      format: "DD|MM|YYYY"
    };
    const wrapper = shallowRenderWithOptions(options);
    expect(wrapper.state("selectedRange")).toBe("");
    expect(options.onRangeSelected).toBeCalledTimes(0);
  });

  it("if none of the date is passed", () => {
    const options = {
      format: "DD|MM|YYYY"
    };
    const wrapper = shallowRenderWithOptions(options);
    expect(wrapper.state("selectedRange")).toBe("");
    expect(options.onRangeSelected).toBeCalledTimes(0);
  });
});

describe("setDefaultFlyoutClassName method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    wrapper = shallow(<ReactDateRangePicker options={options} />);
  });

  it("setDefaultFlyoutClassName should set the state of component properly", () => {
    wrapper.setState({
      showFlyout: true,
      rangeIsDirty: true
    });
    expect(wrapper.state("showFlyout")).toBe(true);
    expect(wrapper.state("rangeIsDirty")).toBe(true);
    wrapper.instance().setDefaultFlyoutClassName();
    expect(wrapper.state("showFlyout")).toBe(false);
    expect(wrapper.state("rangeIsDirty")).toBe(false);
  });
});
