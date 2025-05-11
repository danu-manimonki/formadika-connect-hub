
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { RegistrationForm } from "./RegistrationForm";

interface RegistrationFormSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  title: string;
  description: string;
}

export function RegistrationFormSheet({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
  title,
  description
}: RegistrationFormSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90%] sm:max-w-[540px] lg:max-w-[640px] overflow-y-auto max-h-screen">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <RegistrationForm 
            onSubmit={onSubmit} 
            initialData={initialData} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
