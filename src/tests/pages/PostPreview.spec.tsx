import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { mocked } from "ts-jest/utils";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { useRouter } from "next/router";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-post",
  title: "my-new-post",
  content: "<p>post-excerpt</p>",
  updatedAt: "10 de abril",
};

jest.mock("next-auth/react");
jest.mock("next/router");
jest.mock("../../services/prismic");

describe("Post preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false] as any);

    render(<Post post={post} />);

    expect(screen.getByText("my-new-post")).toBeInTheDocument();
    expect(screen.getByText("post-excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post if user is subscribed", () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: { activeSubscription: 'fake-active-subscription'}
    } as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  });

    it("loads initial data", async () => {
      const getPrismicClientMocked = mocked(getPrismicClient);

      getPrismicClientMocked.mockReturnValueOnce({
        getByUID: jest.fn().mockReturnValueOnce({
          data: {
            title: [
              {
                type: "heading",
                text: "My new post",
              },
            ],
            content: [
              {
                type: "paragraph",
                text: "Post content",
              },
            ],
          },
          last_publication_date: "04-01-2021",
        }),
      } as any);

      const response = await getStaticProps({ params: { slug: 'my-new-post'}})

      expect(response).toEqual(
        expect.objectContaining({
          props: {
            post: {
              slug: "my-new-post",
              title: "My new post",
              content: "<p>Post content</p>",
              updatedAt: '01 de abril de 2021'
            },
          },
        })
      );
    });
});
