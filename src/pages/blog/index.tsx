import IndexPage from "@/BlogComponents/IndexPage";
import PreviewIndexPage from "@/BlogComponents/PreviewIndexPage";
import { readToken } from "@/lib/sanity.api";
import { getAllPosts, getClient, getSettings } from "@/lib/sanity.client";
import { Post, Settings } from "@/lib/sanity.queries";
import { GetServerSideProps, GetStaticProps } from "next";
import { SharedPageProps } from "../_app";
import "./global.css";

interface PageProps extends SharedPageProps {
  posts: Post[];
  settings: Settings;
}

interface Query {
  [key: string]: string;
}

export default function Page(props: PageProps) {
  const { posts, settings, draftMode } = props;

  if (draftMode) {
    return <PreviewIndexPage posts={posts} settings={settings} />;
  }

  return <IndexPage posts={posts} settings={settings} />;
}

export const getServerSideProps: GetServerSideProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx;
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
  ]);

  return {
    props: {
      posts,
      settings,
      draftMode,
      token: draftMode ? readToken : "",
    },
  };
};
