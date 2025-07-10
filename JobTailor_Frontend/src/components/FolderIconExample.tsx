import React from 'react';
import FolderIcon from './FolderIcon';

const FolderIconExample: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Folder Icon Examples</h2>
      
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <FolderIcon type="default" size={32} />
          <span className="text-sm mt-1">Default</span>
        </div>
        
        <div className="flex flex-col items-center">
          <FolderIcon type="open" size={32} color="#52c41a" />
          <span className="text-sm mt-1">Open</span>
        </div>
        
        <div className="flex flex-col items-center">
          <FolderIcon type="add" size={32} color="#fa8c16" />
          <span className="text-sm mt-1">Add</span>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Interactive Example</h3>
        <div className="flex items-center space-x-2">
          <FolderIcon 
            type="default" 
            size={24} 
            onClick={() => alert('Folder clicked!')}
            className="cursor-pointer hover:opacity-70"
          />
          <span>Click me!</span>
        </div>
      </div>
    </div>
  );
};

export default FolderIconExample; 