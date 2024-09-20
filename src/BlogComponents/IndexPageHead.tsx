import BlogMeta from '@/BlogComponents/BlogMeta'
import * as demo from '@/lib/demo.data'
import { Settings } from '@/lib/sanity.queries'
import Head from 'next/head'
import { toPlainText } from 'next-sanity'

export interface IndexPageHeadProps {
  settings: Settings
}

export default function IndexPageHead({ settings }: IndexPageHeadProps) {
  const {
    title = demo.title,
    description = demo.description,
    ogImage = {},
  } = settings
  const ogImageTitle = ogImage?.title || demo.ogImageTitle

  return (
    <Head>
      <title>ROC - Latest from ROC</title>
      <BlogMeta />
      {/* <meta
        key="description"
        name="description"
        content={toPlainText(description)}
      />
      <meta
        property="og:image"
        // Because OG images must have a absolute URL, we use the
        // `VERCEL_URL` environment variable to get the deployment’s URL.
        // More info:
        // https://vercel.com/docs/concepts/projects/environment-variables
        content={`${
          process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
        }/api/og?${new URLSearchParams({ title: ogImageTitle })}`}
      /> */}
      <meta property="og:title" content="Latest from ROC" />
      <meta
        property="og:description"
        content="Your one-stop-shop for Latest from #ROC.Explore our blog for expert advice and in-depth discussions"
      />
      <meta
        property="og:image"
        content="https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png"
      />

      <meta property="og:url" content="https://www.roc.je/" />
    </Head>
  );
}
