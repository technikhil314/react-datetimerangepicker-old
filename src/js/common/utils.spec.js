import { classNames } from "./utils";
describe("utils", () => {
  let data;
  beforeEach(() => {
    data = {
      demo: true,
      demo1: false,
      demo2: undefined,
      demo3: null,
      demo4: [],
      demo5: "",
      demo6: "demo",
      demo7: 1
    };
  });
  it("ClassNames function should return all valid classNames in space separated string", () => {
    expect(classNames(data)).toEqual("demo demo4 demo6 demo7");
  });
});
