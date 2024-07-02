declare module 'react-custom-checkbox' {
    import React from 'react';
  
    interface CheckboxProps {
      icon: React.ReactNode;
      checked: boolean;
      onChange: (checked: boolean) => void;
      borderRadius?: number;
      size?: number;
      style?: React.CSSProperties;
    }
  
    const Checkbox: React.FC<CheckboxProps>;
  
    export default Checkbox;
  }
