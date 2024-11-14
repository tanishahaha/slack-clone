import { getUserData } from "@/actions/get-user-data";
import { redirect } from "next/navigation";


export default async function Home() {

  const userData = await getUserData();

  if (!userData) {
    return redirect('/auth');
  }
  console.log(userData)

  const userWorkspaceId = userData.workspaces?.[0];

  if (!userWorkspaceId) {
    return redirect('/create-workspace');
  }

  if (userWorkspaceId) return redirect(`/workspace/${userWorkspaceId}`);

  return (
    <div>
      hii
    </div>
  );

}
