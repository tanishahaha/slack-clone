'use client';
import { User } from '@/types/app';
import { FC, useEffect, useState } from 'react'
import DotAnimatedLoader from '@/components/dot-animated-loader';
import "@livekit/components-styles";
import {
    ControlBar,
    GridLayout,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

type VideoChatProps = {
    chatId: string;
    userData: User;
}

const VideoChat: FC<VideoChatProps> = ({ chatId, userData }) => {

    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const name = userData.email;

        (async () => {
            try {
                const resp = await fetch(`/api/token?room=${chatId}&username=${name}`);
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [chatId, userData.email])

    if (token === "") return <DotAnimatedLoader></DotAnimatedLoader>
    return (
        <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={process.env.LIVEKIT_URL}
            // Use the default LiveKit theme for nice styles.
            data-lk-theme="default"
            style={{ height: '100dvh' }}
        >
            {/* Your custom component with basic video conferencing functionality. */}
            <MyVideoConference />
            {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
            <RoomAudioRenderer />
            {/* Controls for the user to start/stop audio, video, and screen
          share tracks and to leave the room. */}
            <ControlBar />
        </LiveKitRoom>
    );
}

function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    return (
        <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
            {/* The GridLayout accepts zero or one child. The child is used
          as a template to render all passed in tracks. */}
            <ParticipantTile />
        </GridLayout>
    );

}

export default VideoChat