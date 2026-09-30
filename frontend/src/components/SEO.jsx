import { Helmet } from "react-helmet-async";

const PUBLIC_URL = (process.env.REACT_APP_PUBLIC_URL || "").replace(/\/$/, "");

export default function SEO({ title, description, path = "" }) {
  const full = title ? `${title} | AI Career Master` : "AI Career Master — AI Powered Career Acceleration Platform";
  const canonical = PUBLIC_URL ? `${PUBLIC_URL}${path}` : null;
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta name="robots" content="index, follow" />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}
