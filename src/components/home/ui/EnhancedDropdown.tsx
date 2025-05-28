import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, X, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Specialty {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

interface EnhancedDropdownProps {
  type: "specialty" | "rating" | "language";
  label: string;
  placeholder: string;
  value: string | string[];
  options: string[] | Specialty[];
  onChange: (value: string | string[]) => void;
  disabled?: boolean;
}

const formatDisplayText = (text: string): string => {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function EnhancedDropdown({
  type,
  label,
  placeholder,
  value,
  options,
  onChange,
  disabled = false,
}: EnhancedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = options.filter((option) => {
    const optionName = typeof option === "string" ? option : option.name;
    return optionName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const renderContent = () => {
    switch (type) {
      case "specialty":
        return (
          <div className="p-4 h-[400px] overflow-y-auto">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search specialty, symptoms"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <DropdownMenuRadioGroup
              value={value as string}
              onValueChange={(val) => onChange(val)}
              className="grid grid-cols-2 gap-3"
            >
              {filteredOptions.map((option) => {
                const specialty =
                  typeof option === "string"
                    ? { name: option, slug: option.toLowerCase() }
                    : option;
                return (
                  <DropdownMenuRadioItem
                    key={specialty.slug}
                    value={specialty.slug}
                    className="relative p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex mx-auto flex-col items-center gap-2">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-blue-50 flex items-center justify-center">
                        {typeof option !== "string" && option.icon}
                      </div>
                      <span className="text-sm font-medium text-center">
                        {specialty.name}
                      </span>
                      <div className="absolute top-2 right-2">
                        <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center">
                          {value === specialty.slug && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </div>
        );

      case "rating":
        return (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <DropdownMenuLabel className="text-lg font-semibold">
                {label}
              </DropdownMenuLabel>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <DropdownMenuRadioGroup
              value={value as string}
              onValueChange={(val) => onChange(val)}
              className="grid grid-cols-2 gap-3"
            >
              {filteredOptions.map((option) => {
                const rating =
                  typeof option === "string" ? option : option.name;
                return (
                  <DropdownMenuRadioItem
                    key={rating}
                    value={rating}
                    className="relative p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{rating}</span>
                      <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center">
                        {value === rating && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    </div>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </div>
        );

      case "language":
        return (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <DropdownMenuLabel className="text-lg font-semibold">
                {label}
              </DropdownMenuLabel>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {filteredOptions.map((option) => {
                const language =
                  typeof option === "string" ? option : option.name;
                return (
                  <div
                    key={language}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      checked={(value as string[]).includes(language)}
                      onCheckedChange={() => {
                        const newValue = (value as string[]).includes(language)
                          ? (value as string[]).filter((v) => v !== language)
                          : [...(value as string[]), language];
                        onChange(newValue);
                      }}
                      className="border-2 border-blue-500 data-[state=checked]:bg-blue-500"
                    />
                    <label className="text-sm font-medium cursor-pointer">
                      {language}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        disabled={disabled}
        className="w-full md:w-auto text-left p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
            <p className="text-base font-semibold text-gray-900 capitalize">
              {Array.isArray(value) ? (
                value.length ? (
                  value.map((v) => formatDisplayText(v)).join(", ")
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )
              ) : value ? (
                formatDisplayText(value)
              ) : (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-200">
              <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-blue-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[90vw] md:w-[400px] rounded-xl shadow-lg border border-gray-100"
        align="start"
      >
        {renderContent()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
