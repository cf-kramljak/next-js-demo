import config from "../config";

export const getMetadataTitle = (title: string) =>
  `${title} | ${config.metadata.name}`;
