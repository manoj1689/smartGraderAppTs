declare module 'react-country-state-city' {
    import { FC } from 'react';
  
    interface DropdownProps {
      value: string;
      onChange: (value: string) => void;
      country?: string;
      region?: string;
      [key: string]: any;
    }
  
    export const CountryDropdown: FC<DropdownProps>;
    export const RegionDropdown: FC<DropdownProps>;
    export const CityDropdown: FC<DropdownProps>;
  }
  