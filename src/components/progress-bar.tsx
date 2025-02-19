"use client"
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 1) % 101);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Progress className='bg-slate-800' value={progress} max={100}></Progress>
  )
}

export default ProgressBar