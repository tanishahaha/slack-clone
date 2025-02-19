import { format } from 'date-fns';
import React, { FC } from 'react'

type IntroBannerProps = {
    type: 'Channel' | 'DirectMessage';
    name: string;
    creationDate: string;
}

const IntroBanner: FC<IntroBannerProps> = ({ type, name, creationDate }) => {

    const channelMessage = creationDate ? `You created this channel on ${format(
        new Date(creationDate), 'd MMM yyyy'
    )}. This is the very beginning of the ${name} channel.` : '';

    const directMessage = `Chat One-on-One with the user here`

    return (
        <div className='px-2 mb-5'>
            {
                type === 'Channel' && <p>{channelMessage}</p>
            }
            {
                type === 'DirectMessage' && <p className='text-zinc-600 dark:text-zinc-400 text-sm'>{directMessage}</p>
            }
        </div>
    )
}

export default IntroBanner