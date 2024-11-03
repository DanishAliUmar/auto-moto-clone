import React, { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SideModalProps {
  trigger?: ReactNode; // Allow any React node for the trigger
  title?: string; // Optional title prop
  description?: string; // Optional description prop
  children?: ReactNode; // Allow any React node as children
}

const SideModal: React.FC<SideModalProps> = ({
  trigger,
  title,
  description,
  children,
}) => {
  return (
    <Sheet>
      <SheetTrigger>{trigger || "Open"}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title || "Default Title"}</SheetTitle>
          <SheetDescription>{description || "Default description."}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default SideModal;
