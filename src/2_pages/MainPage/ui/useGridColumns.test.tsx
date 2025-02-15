import React from "react";
import { renderHook } from "@testing-library/react";
import { useGridColumns } from "./useGridColumns";

describe('useGridColumns', () => {
  beforeAll(() => {
    React.useRef = jest.fn().mockImplementation(() => ({
      current: {
        clientWidth: 320,
      }
    }));

    global.ResizeObserver = jest.fn().mockImplementation((callback) => ({
      observe: jest.fn().mockImplementation(() => {
        callback();
      }),
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('correct work', () => {
    const { result } = renderHook(() => useGridColumns({
      gap: 10,
      itemMinWidth: 100,
      maxColCount: 3
    }));

    const { columns } = result.current;
    expect(columns).toBe(3);
  });
});
