import {
  LoginForm,
  ProfileDeleteAccount,
  ProfileDetails,
  ProfilePassword,
  UserNavigation
} from '@/components/molecules';
import { retrieveCustomer } from '@/lib/data/customer';

export default async function ReviewsPage() {
  const user = await retrieveCustomer();

  if (!user) return <LoginForm />;

  return (
    <main
      className="container"
      data-testid="profile-settings-page"
    >
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-8">
        <UserNavigation />
        <div
          className="md:col-span-3"
          data-testid="profile-settings-container"
        >
          <h1 className="heading-md mb-8 uppercase">Settings</h1>
          <ProfileDetails user={user} />
          <ProfilePassword user={user} />
          <ProfileDeleteAccount user={user} />
        </div>
      </div>
    </main>
  );
}
