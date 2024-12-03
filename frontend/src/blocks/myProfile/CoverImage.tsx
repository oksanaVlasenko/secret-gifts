import FileInput from "@/components/file-input/FileInput"
import { CameraIcon, TrashIcon } from "@heroicons/react/16/solid"

const CoverImage: React.FC<{ 
  coverURL: string | null, 
  onCoverFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  onDeleteCover: () => void
}> = ({
  coverURL,
  onCoverFileChange,
  onDeleteCover
}) => {
  return (
    <div className={`bg-image ${!coverURL ? 'not-img' : ''}`}>
      {
        coverURL && (
          <img  
            src={coverURL ?? ''} 
            alt="bg image" 
          />
        )
      }

      {
        coverURL && (
          <div className='delete-bg'>
            <TrashIcon 
              className='icon-bg-upload'
              onClick={onDeleteCover}
            />
          </div>
        )
      }
      
      <FileInput 
        triggerElement={
          <div className='upload-bg'>
            <CameraIcon className='icon-bg-upload'/>
          </div>                  
        }
        onFileSelect={onCoverFileChange}
      />
    </div>
  )
}

export default CoverImage