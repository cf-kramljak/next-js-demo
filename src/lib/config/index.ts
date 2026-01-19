export interface IConfig {
  apiUrl: string;
}

const config: IConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
};

export default config;
