import { useCreateWorkspaceValues } from '@/hooks/create-workspace-values'
import { UploadDropzone } from '@/utils/uploadthing';
import Image from 'next/image';
import { MdCancel } from 'react-icons/md';

const ImageUpload = () => {
  const { imageUrl, updateImageUrl } = useCreateWorkspaceValues();

  if (imageUrl) {
    return <div className='flex items-center justify-center h-32 w-32 relative'>
      <Image src={imageUrl} className='object-cover w-full h-full rounded-md' alt='workspace' width={320} height={320} />

      <MdCancel size={24} onClick={() => updateImageUrl('')} className='absolute cursor-pointer -right-1 -top-1 z-10 hover:scale-110 text-black' />
    </div>
  }
  return (
    <UploadDropzone endpoint='workspaceImage' onClientUploadComplete={res => {
      updateImageUrl(res?.[0].url);
    }} onUploadError={(err) => console.log(err)} />
  )
}

export default ImageUpload