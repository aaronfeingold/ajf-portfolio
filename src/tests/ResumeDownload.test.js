// src/tests/ResumeDownload.test.js
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ResumeDownload from "../Components/ResumeDownload";

// Mock the fetch function
global.fetch = jest.fn();
// Mock window.location
const mockLocation = new URL("http://dummy.com");
delete window.location;
window.location = mockLocation;

describe("ResumeDownload Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_R2_WORKER_URL = "https://test-worker.url";
  });

  it("renders download button in initial state", () => {
    render(<ResumeDownload />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Download Resume");
    expect(button).not.toBeDisabled();
  });

  it("shows loading state while downloading", async () => {
    // Mock a delayed response
    global.fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                json: () => Promise.resolve({ url: "https://signed-url.com" }),
              }),
            100
          )
        )
    );

    render(<ResumeDownload />);
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
      // Wait for any state updates
      await waitFor(() => {
        expect(button).toHaveTextContent("Preparing Download...");
        expect(button).toBeDisabled();
      });
    });
  });

  it("redirects to signed URL on successful fetch", async () => {
    const mockSignedUrl = "https://signed-url.com/resume.pdf";
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ url: mockSignedUrl }),
      })
    );

    render(<ResumeDownload />);
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
      await waitFor(() => {
        expect(window.location.href).toBe(mockSignedUrl);
      });
    });
  });

  it("handles fetch error gracefully", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    render(<ResumeDownload />);
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
      await waitFor(() => {
        expect(button).not.toBeDisabled();
        expect(button).toHaveTextContent("Download Resume");
        expect(consoleSpy).toHaveBeenCalled();
      });
    });

    consoleSpy.mockRestore();
  });

  it("handles missing URL in response", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: "No URL generated" }),
      })
    );

    render(<ResumeDownload />);
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
      await waitFor(() => {
        expect(button).not.toBeDisabled();
        expect(button).toHaveTextContent("Download Resume");
        expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch signed URL");
      });
    });

    consoleSpy.mockRestore();
  });

  it("uses correct environment variable for worker URL", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ url: "https://signed-url.com" }),
      })
    );

    render(<ResumeDownload />);
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          process.env.REACT_APP_R2_WORKER_URL
        );
      });
    });
  });
it("shows error modal when download fails", async () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error("Network error"))
  );

  render(<ResumeDownload />);
  const button = screen.getByRole("button");

  await act(async () => {
    fireEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText(
          "Unable to download resume. Please try again later or contact me directly."
        )
      ).toBeInTheDocument();
    });
  });

  consoleSpy.mockRestore();
});

it("closes error modal when clicking close button", async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error("Network error"))
  );

  render(<ResumeDownload />);
  const button = screen.getByRole("button");

  await act(async () => {
    fireEvent.click(button);
    await waitFor(() => {
      const errorMessage = screen.getByText(
        "Unable to download resume. Please try again later or contact me directly."
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Close"));
    await waitFor(() => {
      expect(
        screen.queryByText(
          "Unable to download resume. Please try again later or contact me directly."
        )
      ).not.toBeInTheDocument();
    });
  });
});
});
