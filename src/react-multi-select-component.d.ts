declare module "react-multi-select-component" {
    import { ComponentType } from "react";
  
    export interface OptionType {
      label: string;
      value: string;
    }
  
    interface MultiSelectProps {
      options: OptionType[];
      value: OptionType[];
      onChange: (selected: OptionType[]) => void;
      labelledBy?: string;
      overrideStrings?: {
        selectAll?: string;
        allItemsAreSelected?: string;
        selectAllItems?: string;
        search?: string;
        clearSearch?: string;
        noOptions?: string;
      };
      className?: string;
    }
  
    const MultiSelect: ComponentType<MultiSelectProps>;
    export default MultiSelect;
  }
  