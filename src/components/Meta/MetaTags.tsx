import Head from "next/head";

const MetaTag = () => {
  return (
    <>
      <Head>
        <title>ROC - What's #OnTheROC</title>
        <meta
          name="description"
          content="Your one-stop-shop for what's #OnTheROC."
        />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="ROC - What's #OnTheROC" />
        <meta
          itemProp="description"
          content="Your one-stop-shop for what's #OnTheROC."
        />
        <meta
          itemProp="image"
          content="https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png"
        />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://www.roc.je" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ROC - What's #OnTheROC" />
        <meta
          property="og:description"
          content="Your one-stop-shop for what's #OnTheROC."
        />
        <meta
          property="og:image"
          content="https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ROC - What's #OnTheROC" />
        <meta
          name="twitter:description"
          content="Your one-stop-shop for what's #OnTheROC."
        />
        <meta
          name="twitter:image"
          content="https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png"
        />
      </Head>
      {/* Your page content goes here */}
    </>
  );
};

export default MetaTag;
