import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react'
import { FC } from 'react'

type TypographyProps = {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
    text: string;
    className?: string;
} & HTMLAttributes<HTMLElement>;

const Typography: FC<TypographyProps> = ({ variant = 'h1', text, className, ...props }) => {

    const classNames = {
        h1: 'scroll-m-20 text-4xl font-extra-bold tracking-tight lg:text-5xl',
        h2: 'scroll-m-16 text-3xl font-bold tracking-tight lg:text-4xl',
        h3: 'scroll-m-12 text-2xl font-semibold tracking-tight lg:text-3xl',
        h4: 'scroll-m-10 text-xl font-medium  lg:text-2xl',
        h5: 'scroll-m-8 text-lg font-normal  lg:text-xl',
        h6: 'scroll-m-6 text-base font-normal  lg:text-xl',
        p: 'scroll-m-4 text-sm font-normal tracking-wide lg:text-base',
    };

    const Tag = variant;
    const defaultClassName = classNames[variant]

    const combinedClassName = cn(defaultClassName, className);

    return (
        <Tag className={combinedClassName} {...props}>{text}</Tag>
    )
}

export default Typography