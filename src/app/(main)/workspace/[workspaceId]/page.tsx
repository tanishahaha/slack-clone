import { getCurrentWorkspaceData } from '@/actions/get-current-workspace-data';
import { getUserData } from '@/actions/get-user-data';
import { getUserWorkspaceData } from '@/actions/get-user-workspace-data';
import { getWorkspaceChannels } from '@/actions/get-workspace-channels';
import InfoSection from '@/components/info-section';
import NoDataScreen from '@/components/no-data-channel';
import Sidebar from '@/components/sidebar';
import { Workspace as UserWorkspace } from '@/types/app';
import { redirect } from 'next/navigation';

const page = async ({ params: { workspaceId } }: { params: { workspaceId: string } }) => {

  // console.log(id);

  const userData = await getUserData();

  if (!userData) {
    return redirect('/auth');
  }
  const [userWorkspaceData,] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData,] = await getCurrentWorkspaceData(workspaceId);

  const userWorkspaceChannels = await getWorkspaceChannels(
    currentWorkspaceData.id,
    userData.id
  )


  return (
    <>

      <div className='hidden md:block '>
        <Sidebar userWrokspaceData={userWorkspaceData as UserWorkspace[]} currentWorkspaceData={currentWorkspaceData} userData={userData} />
        <InfoSection userData={userData} currentWorkspaceData={currentWorkspaceData} workspaceChannels={userWorkspaceChannels} currentChannelId='' />
        <NoDataScreen userId={userData.id} workspaceId={currentWorkspaceData.id} workspaceName={currentWorkspaceData.name} />
      </div>
      <div className='md:hidden block min-h-screen'>

      </div>

    </>
  )
}

export default page