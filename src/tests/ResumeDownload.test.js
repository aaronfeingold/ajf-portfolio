// src/tests/ResumeDownload.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResumeDownload from "../components/ResumeDownload";

// Mock the fetch function
global.fetch = jest.fn();
// Mock window.location
const mockLocation = new URL("http://dummy.com");
delete window.location;
window.location = mockLocation;

describe("ResumeDownload Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
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

    fireEvent.click(button);

    expect(button).toHaveTextContent("Preparing Download...");
    expect(button).toBeDisabled();
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

    fireEvent.click(button);

    await waitFor(() => {
      expect(window.location.href).toBe(mockSignedUrl);
    });
  });

  it("handles fetch error gracefully", async () => {
    // Mock console.error to prevent error output in tests
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    render(<ResumeDownload />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent("Download Resume");
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it("handles missing URL in response", async () => {
    // Mock console.error to prevent error output in tests
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

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent("Download Resume");
      expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch signed URL");
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

    fireEvent.click(button);

    expect(global.fetch).toHaveBeenCalledWith(
      process.env.REACT_APP_R2_WORKER_URL
    );
  });
});
