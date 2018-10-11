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
    wrapper = shallow(<ReactDateRangePicker {...options} />);
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
    wrapper = shallow(<ReactDateRangePicker {...options} />);
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
    return shallow(<ReactDateRangePicker {...options} />);
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
    return shallow(<ReactDateRangePicker {...options} />);
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
    return shallow(<ReactDateRangePicker {...options} />);
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

describe("setStateDefaults method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    wrapper = shallow(<ReactDateRangePicker {...options} />);
  });

  it("setStateDefaults should set the state of component properly", () => {
    wrapper.setState({
      showFlyout: true,
      rangeIsDirty: true
    });
    expect(wrapper.state("showFlyout")).toBe(true);
    expect(wrapper.state("rangeIsDirty")).toBe(true);
    wrapper.instance().setStateDefaults();
    expect(wrapper.state("showFlyout")).toBe(false);
    expect(wrapper.state("rangeIsDirty")).toBe(false);
  });
});

describe("onRangeSelected method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    wrapper = shallow(<ReactDateRangePicker {...options} />);
  });

  it("onRangeSelected should set the state of component properly", () => {
    wrapper
      .instance()
      .onRangeSelected("dummyFromDate", "dummyToDate", "dummyRange");
    expect(wrapper.state("selectedRange")).toBe("dummyRange");
    expect(onRangeSelectedMock).toHaveBeenCalledWith({
      fromDate: "dummyFromDate",
      toDate: "dummyToDate"
    });
  });

  it("when no arguments are passed", () => {
    wrapper.setState({
      selectedRange: "dummyRange"
    });
    wrapper.instance().onRangeSelected();
    expect(wrapper.state("selectedRange")).toBe("");
    expect(onRangeSelectedMock).toHaveBeenCalledWith({
      fromDate: undefined,
      toDate: undefined
    });
  });
});

describe("setFromDate method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    wrapper = shallow(<ReactDateRangePicker {...options} />);
  });

  it("setFromDate should set the state of component properly", () => {
    let dummyDate = moment("11/12/2018", "DD/MM/YYYY");
    wrapper.instance().setFromDate(dummyDate);
    expect(wrapper.state("fromDate").isSame(dummyDate.startOf("day"))).toBe(
      true
    );
    expect(wrapper.state("rangeIsDirty")).toBe(true);
  });

  it("if selected from date is after to date", () => {
    let dummyDate = moment("11/12/2017", "DD/MM/YYYY");
    wrapper.setState({
      toDate: dummyDate
    });
    expect(wrapper.state("toDate")).toBe(dummyDate);
    dummyDate = moment("11/12/2018", "DD/MM/YYYY");
    wrapper.instance().setFromDate(dummyDate);
    expect(wrapper.state("fromDate").isSame(dummyDate.startOf("day"))).toBe(
      true
    );
    expect(wrapper.state("toDate").isSame(dummyDate.endOf("day"))).toBe(true);
    expect(wrapper.state("rangeIsDirty")).toBe(true);
  });
});

describe("setToDate method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    wrapper = shallow(<ReactDateRangePicker {...options} />);
  });

  it("setToDate should set the state of component properly", () => {
    let dummyDate = moment("11/12/2018", "DD/MM/YYYY");
    wrapper.instance().setToDate(dummyDate);
    expect(
      wrapper
        .state("toDate")
        .isSame(moment("11/12/2018", "DD/MM/YYYY").endOf("day"))
    ).toBe(true);
    expect(wrapper.state("rangeIsDirty")).toBe(true);
  });

  it("if selected to date is before from date", () => {
    let dummyDate = moment("11/12/2018", "DD/MM/YYYY");
    wrapper.setState({
      fromDate: dummyDate
    });
    expect(wrapper.state("fromDate")).toBe(dummyDate);
    dummyDate = moment("11/12/2017", "DD/MM/YYYY");
    wrapper.instance().setToDate(dummyDate);
    expect(wrapper.state("fromDate").isSame(dummyDate.startOf("day"))).toBe(
      true
    );
    expect(wrapper.state("toDate").isSame(dummyDate.endOf("day"))).toBe(true);
    expect(wrapper.state("rangeIsDirty")).toBe(true);
  });
});

describe("backupOldDates method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    wrapper = shallow(<ReactDateRangePicker {...options} />);
  });

  it("should take backup of old dates properly", () => {
    wrapper.setState({
      fromDate: "dummyfromdate",
      toDate: "dummytodate"
    });
    wrapper.instance().backupOldDates();
    expect(wrapper.instance().oldFromDate).toBe("dummyfromdate");
    expect(wrapper.instance().oldToDate).toBe("dummytodate");
  });
});

describe("restoreOldDates method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    wrapper = shallow(<ReactDateRangePicker {...options} />);
  });

  it("if back up is taken", () => {
    wrapper.instance().oldFromDate = "dummyoldfromdate";
    wrapper.instance().oldToDate = "dummyoldtodate";
    wrapper.instance().oldDatesStored = true;
    wrapper.instance().restoreOldDates();
    expect(wrapper.state("fromDate")).toBe("dummyoldfromdate");
    expect(wrapper.state("toDate")).toBe("dummyoldtodate");
  });

  it("if backup is not taken", () => {
    wrapper.instance().oldFromDate = "dummyoldfromdate";
    wrapper.instance().oldToDate = "dummyoldtodate";
    wrapper.instance().restoreOldDates();
    expect(wrapper.state("fromDate")).toBe(null);
    expect(wrapper.state("toDate")).toBe(null);
  });
});

describe("clearBackedupOldDates method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    wrapper = shallow(<ReactDateRangePicker {...options} />);
  });

  it("should clear properly", () => {
    wrapper.setState({
      fromDate: "dummyFromDate",
      toDate: "dummyToDate"
    });
    wrapper.instance().backupOldDates();
    wrapper.instance().clearBackedupOldDates();
    expect(wrapper.instance().oldFromDate).toBe(undefined);
    expect(wrapper.instance().oldToDate).toBe(undefined);
    expect(wrapper.instance().oldDatesStored).toBe(false);
  });
});

describe("applyRange method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    options.format = "DD/MM/YYYY";
    wrapper = shallow(<ReactDateRangePicker {...options} />);
  });

  it("should call the callback and set state properly", () => {
    let mockDate = moment();
    wrapper.setState({
      fromDate: mockDate,
      toDate: mockDate,
      showFlyout: true,
      isRangeDirty: true
    });
    wrapper.instance().oldFromDate = "dummyoldfromdate";
    wrapper.instance().oldToDate = "dummyoldtodate";
    wrapper.instance().oldDatesStored = true;
    wrapper.instance().applyRange();
    expect(wrapper.instance().oldFromDate).toBe(undefined);
    expect(wrapper.instance().oldToDate).toBe(undefined);
    expect(wrapper.instance().oldDatesStored).toBe(false);
    expect(wrapper.state("selectedRange")).toBe(
      `${mockDate.format("DD/MM/YYYY")} - ${mockDate.format("DD/MM/YYYY")}`
    );
    expect(wrapper.state("showFlyout")).toBe(false);
    expect(wrapper.state("rangeIsDirty")).toBe(false);
    expect(onRangeSelectedMock).toHaveBeenCalledWith({
      fromDate: mockDate,
      toDate: mockDate
    });
  });
});

describe("cancel method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    wrapper = shallow(<ReactDateRangePicker {...options} />);
  });

  it("if back up is taken", () => {
    wrapper.instance().oldFromDate = "dummyoldfromdate";
    wrapper.instance().oldToDate = "dummyoldtodate";
    wrapper.instance().oldDatesStored = true;
    wrapper.instance().cancel();
    expect(wrapper.state("fromDate")).toBe("dummyoldfromdate");
    expect(wrapper.state("toDate")).toBe("dummyoldtodate");
  });

  it("if backup is not taken", () => {
    wrapper.instance().oldFromDate = "dummyoldfromdate";
    wrapper.instance().oldToDate = "dummyoldtodate";
    wrapper.instance().cancel();
    expect(wrapper.state("fromDate")).toBe(null);
    expect(wrapper.state("toDate")).toBe(null);
  });
});
describe("clear method", () => {
  let wrapper,
    onRangeSelectedMock = jest.fn(),
    options = {};
  beforeEach(() => {
    options.onRangeSelected = onRangeSelectedMock;
    options.format = "DD/MM/YYYY";
    wrapper = shallow(<ReactDateRangePicker {...options} />);
  });

  it("should call the callback and set state properly", () => {
    let mockDate = moment();
    wrapper.setState({
      fromDate: mockDate,
      toDate: mockDate,
      showFlyout: true,
      isRangeDirty: true,
      selectedRange: "demo"
    });
    wrapper.instance().oldFromDate = "dummyoldfromdate";
    wrapper.instance().oldToDate = "dummyoldtodate";
    wrapper.instance().oldDatesStored = true;
    wrapper.instance().clear();
    expect(wrapper.instance().oldFromDate).toBe(undefined);
    expect(wrapper.instance().oldToDate).toBe(undefined);
    expect(wrapper.instance().oldDatesStored).toBe(false);
    expect(wrapper.state("selectedRange")).toBe("");
    expect(wrapper.state("fromDate")).toBe(undefined);
    expect(wrapper.state("toDate")).toBe(undefined);
    expect(wrapper.state("showFlyout")).toBe(false);
    expect(wrapper.state("rangeIsDirty")).toBe(false);
    expect(onRangeSelectedMock).toHaveBeenCalledWith({
      fromDate: undefined,
      toDate: undefined
    });
  });
});
