import { SignInButton } from ".";
import { mocked } from "ts-jest/utils";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: null }); //mocka apenas o proximo retorno

    render(<SignInButton />);

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "Rafael",
        },
        expires: "2022-01-23T21:27:50.900Z"
      }, 
      status: "authenticated"
    });

    const { debug } = render(<SignInButton />);

    debug();

    expect(screen.getByText("Rafael")).toBeInTheDocument();
  });
});
