import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, path = "" }) {
  const full = title ? `${title} | AI Career Master` : "AI Career Master — AI Powered Career Acceleration Platform";
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
