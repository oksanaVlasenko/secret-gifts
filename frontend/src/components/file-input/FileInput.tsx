import React, { useRef } from 'react';

interface FileInputProps {
  triggerElement: React.ReactNode; 
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

const FileInput: React.FC<FileInputProps> = ({ triggerElement, onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(event);
  };

  return (
    <div className='file-input-container'>
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        {triggerElement}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
