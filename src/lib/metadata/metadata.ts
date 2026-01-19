import type { Metadata } from "next";
import { openGraphImage } from "./openGraphImage";
import config from "../config";

const metadata: Metadata = {
  metadataBase: new URL(config.metadata.url),
  title: config.metadata.name,
  description: config.metadata.description,
  openGraph: {
    siteName: config.metadata.name,
    title: config.metadata.name,
    description: config.metadata.description,
    type: "website",
    url: config.metadata.url,
    ...openGraphImage,
  },
};

export default metadata;
