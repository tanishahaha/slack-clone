"use client"
import { cn } from '@/lib/utils';
import { UsecolorPreferences } from '@/provider/color-preferences'
import { FC, useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FaCaretDown, FaCaretRight, FaPlus } from 'react-icons/fa';
import Typography from '@/components/ui/Typography';
import CreateChannelDialog from '@/components/create-channel-dialog';
import { Channels, User, Workspace } from '@/types/app';
import { useRouter } from 'next/navigation';

const InfoSection: FC<{ userData: User; currentWorkspaceData: Workspace; workspaceChannels: Channels[]; currentChannelId: string | undefined }> = ({ userData, currentWorkspaceData, workspaceChannels, currentChannelId }) => {

  const { color } = UsecolorPreferences();


  let hoverCol = 'hover:text-primary-light';

  if (color === 'green') {
    hoverCol = "hover:text-[#245501] ";
  } else if (color === 'blue') {
    hoverCol = 'hover:text-[#023047]'
  }

  let textCol = 'text-primary-light';

  if (color === 'green') {
    textCol = "text-[#245501] ";
  } else if (color === 'blue') {
    textCol = 'text-[#023047]'
  }



  const [isChannelCollapsible, setIsChannelCollapsible] = useState(true);
  const [isDmCollapsible, setIsDmCollapsible] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const navigateToChannel = (channelId: string) => {
    const url = `/workspace/${currentWorkspaceData.id}/channels/${channelId}`;
    router.push(url);
  }

  const navigateToMessage = (memberId: string) => {
    const url = `/workspace/${currentWorkspaceData.id}/direct-message/${memberId}`;
    router.push(url)
  }


  return (
    <div className={cn('fixed left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col items-center text-white bg-slate-600 bg-opacity-20')}>
      <div className='w-full flex flex-col gap-2 p-3 '>
        <div>
          <Collapsible className='flex flex-col gap-2' open={isChannelCollapsible} onOpenChange={() => setIsChannelCollapsible(prev => !prev)}>
            <div className='flex items-center justify-between'>
              <CollapsibleTrigger className='flex items-center gap-2'>
                {
                  isChannelCollapsible ? <FaCaretDown /> : <FaCaretRight />
                }
                <Typography variant='p' text='Channels' className='font-semibold' />
              </CollapsibleTrigger>

              <div className={cn(`cursor-pointer p-2 rounded-full hover:bg-white `, hoverCol)} onClick={() => setDialogOpen(true)}>
                <FaPlus />
              </div>
            </div>

            <CollapsibleContent>

              {
                workspaceChannels.map(channel => {
                  const activeChannel = currentChannelId == channel.id
                  return (

                    <Typography key={channel.id} variant='p' text={`✨ ${channel.name}`} className={cn(`px-2 py-1 rounded-sm cursor-pointer mb-2 hover:bg-white`, hoverCol, activeChannel && `bg-white ${textCol}`)} onClick={() => navigateToChannel(channel.id)} />
                  )
                }
                )


              }

            </CollapsibleContent>

          </Collapsible>
        </div>
        <div>
          <Collapsible className='flex flex-col gap-2' open={isDmCollapsible} onOpenChange={() => setIsDmCollapsible(prev => !prev)}>
            <div className='flex items-center justify-between'>
              <CollapsibleTrigger className='flex items-center gap-2'>
                {
                  isDmCollapsible ? <FaCaretDown /> : <FaCaretRight />
                }
                <Typography variant='p' text='Direct Messages' className='font-semibold' />
              </CollapsibleTrigger>

              <div className={cn(`cursor-pointer p-2 rounded-full hover:bg-white `, hoverCol)} >
                <FaPlus />
              </div>
            </div>

            <CollapsibleContent>
              {
                currentWorkspaceData.members?.map((member) => {
                  return (

                    <Typography key={member.id} variant='p' text={`👉 ${member.name || member.email}`} className={cn(`px-2 py-1 rounded-sm cursor-pointer hover:bg-white`, hoverCol)} onClick={() => navigateToMessage(member.id)} />
                  )
                })
              }

            </CollapsibleContent>

          </Collapsible>
        </div>

      </div>

      <div>
        <CreateChannelDialog setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} workspaceId={currentWorkspaceData.id} userId={userData.id} />
      </div>
    </div>
  )
}

export default InfoSection