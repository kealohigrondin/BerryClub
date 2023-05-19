import { convert } from "./convert";

it("should convert from lb to g", () => {
  expect(convert(12, "lb")).toEqual(Number((5443.104).toFixed(4)));
});

it("should convert from tsp to ml", () => {
  expect(convert(0.125, "tsp")).toEqual(Number((0.616115).toFixed(4)));
});

it("should convert from '' to g", () => {
  expect(convert(6, "")).toEqual(Number((6).toFixed(4)));
});
