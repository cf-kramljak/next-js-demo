export interface IConfig {
  apiUrl: string;
  metadata: {
    name: string;
    description: string;
    url: string;
  };
}

const config: IConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  metadata: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? "",
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? "",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "",
  },
};

export default config;
