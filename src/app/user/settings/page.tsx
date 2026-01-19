import UserSettings from "@/features/userSettings";
import { withAuth } from "@/lib/hoc/withAuth";

const UserSettingsPage = () => {
  return <UserSettings />;
};

export default withAuth(UserSettingsPage);
