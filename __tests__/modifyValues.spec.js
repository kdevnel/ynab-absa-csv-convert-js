import { modifyValues } from "../src/js/processInputCsv/processInputCsv.js";

describe("modifyValues function", function () {
  test("date in format YYYYMMDD should change to DD-MM-YYY", function () {
    const dateInput = [{ date: "20200325" }];
    const dateOutput = {
      date: "25-03-2020",
    };

    expect(modifyValues({}, "date", "20200325")).toEqual(dateOutput);
  });
});
