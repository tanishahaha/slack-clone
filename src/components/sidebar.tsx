"use client"
import { User, Workspace } from '@/types/app'
import React, { FC } from 'react'
import SidebarNav from './sidebar-nav';
import SidenavbarBottom from './side-navbar-bottom';
import { usecolorPreferences } from '@/provider/color-preferences';


type SidebarProps = {
    userWrokspaceData: Workspace[]
    currentWorkspaceData: Workspace;
    userData: User;
}

const Sidebar: FC<SidebarProps> = ({ userWrokspaceData, currentWorkspaceData, userData }) => {

    let backgroundColor = 'bg-primary-dark';
    const { color } = usecolorPreferences();
    if (color === 'green') {
        backgroundColor = 'bg-[#245501]';
    } else if (color === 'blue') {
        backgroundColor = 'bg-[#023047]';
    }

    return (
        <aside className={`fixed top-0 left-0 pt-[68px] pb-8 z-30 flex flex-col justify-between items-center h-screen w-20`}>
            <SidebarNav currentWorkspaceData={currentWorkspaceData} userWorkspaceData={userWrokspaceData} />

            <SidenavbarBottom currentWorkspaceData={currentWorkspaceData} userWorkspaceData={userWrokspaceData} userData={userData}/>
        </aside>
    )
}

export default Sidebar