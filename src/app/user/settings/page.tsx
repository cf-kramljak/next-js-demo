import UserSettings from "@/features/userSettings";
import { USER_SETTINGS_ROUTE } from "@/lib/constants";
import { withAuth } from "@/lib/hoc/withAuth";
import { getMetadataTitle } from "@/lib/metadata/metadataUtils";
import { openGraphImage } from "@/lib/metadata/openGraphImage";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  _arg: Record<string, never>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentOpengraphUrl = (await parent).openGraph?.url;

  return {
    title: getMetadataTitle("Settings"),
    openGraph: {
      title: getMetadataTitle("Settings"),
      url: `${parentOpengraphUrl}${USER_SETTINGS_ROUTE}`,
      ...openGraphImage,
    },
  };
}

const UserSettingsPage = () => {
  return <UserSettings />;
};

export default withAuth(UserSettingsPage);
