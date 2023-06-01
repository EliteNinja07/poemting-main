import { CheckIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";

interface SelectItemProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  value: string;
}
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  (props, forwardedRef) => {
    const { children, ...rest } = props;
    return (
      <Select.Item className={"select_item"} {...rest} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className=".select_item_indicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectItem;
