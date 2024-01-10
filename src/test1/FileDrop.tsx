import React, {DragEvent, useState} from 'react';

const FileDrop = () => {
    const [dragIsOver, setDragIsOver] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsOver(true);
      };
    
      const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsOver(false);
      };
    
      const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsOver(false);
    
        // Fetch the files
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles(droppedFiles);
    
        // Use FileReader to read file content
        droppedFiles.forEach((file) => {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            console.log(reader.result);
          };
    
          reader.onerror = () => {
            console.error('There was an issue reading the file.');
          };
    
          reader.readAsDataURL(file);
          return reader;
        });
      };

    return (
     <div className='main-drag'>
       <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className='drag-drop'
        style={{
        backgroundColor: dragIsOver ? 'white' : '#5a5f69',
      }}
    >
      Drag and drop some files here
    </div>
    </div>

    );
};

export default FileDrop;