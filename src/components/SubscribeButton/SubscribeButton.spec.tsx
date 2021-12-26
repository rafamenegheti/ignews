import { SubscribeButton } from ".";
import { mocked } from "ts-jest/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next-auth/react");
jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("render correctly", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({ data: null, status: null });

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {

    const signInMocked = mocked(useSession)

    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({ data: null, status: null });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirect to posts when user already has a subscription", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);

    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "Rafael",
        },
        expires: "2022-01-23T21:27:50.900Z",
        activeSubscription: "faka-active-subscription",
      },

      status: "authenticated",
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});
