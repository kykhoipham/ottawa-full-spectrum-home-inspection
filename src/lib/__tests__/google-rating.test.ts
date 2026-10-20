import { describe, it, expect } from "vitest";
import { isStale } from "../google-rating.functions";
describe("rating refresh", () => {
  const now = Date.parse("2026-10-20T12:00:00Z");
  it("is fresh under 24 hours", () => expect(isStale("2026-10-19T13:00:00Z", now)).toBe(false));
  it("refreshes after 24 hours", () => expect(isStale("2026-10-19T12:00:00Z", now)).toBe(true));
});
