export const handleMouseDown = (setIsPressed: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsPressed(true);
  };
  
  export const handleMouseUp = (setIsPressed: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsPressed(false);
  };
  