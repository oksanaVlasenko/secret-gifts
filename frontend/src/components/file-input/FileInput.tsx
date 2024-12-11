import React, { useRef } from 'react';

interface FileInputProps {
  triggerElement: React.ReactNode; 
  isMultiple?: boolean,
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

const FileInput: React.FC<FileInputProps> = ({ triggerElement, isMultiple = false, onFileSelect }) => {
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
        accept="image/*"
        style={{ display: 'none' }}
        multiple={isMultiple}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
