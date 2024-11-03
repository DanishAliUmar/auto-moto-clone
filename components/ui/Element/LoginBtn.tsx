import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoginBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  startIcon?: React.ElementType;
  stroke?: string;
  iconSize?: number;
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  fill?: string;
  children?: React.ReactNode;
}

const LoginBtn = React.forwardRef<HTMLButtonElement, LoginBtnProps>(
  (
    {
      variant,
      onClick,
      startIcon: StartIcon,
      stroke = "currentColor",
      iconSize = 18,
      title,
      loading = false,
      disabled = false,
      className = "",
      fill = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        // variant={variant || ""}
        className={`min-w-20 ${className} ${
          loading || disabled ? "!cursor-not-allowed" : ""
        }`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        <>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <div className="flex items-center gap-1">
              {StartIcon && (
                <StartIcon
                  stroke={stroke}
                  fill={fill}
                  size={iconSize}
                  className="text-muted-foreground"
                />
              )}
              {title}
              {children}
            </div>
          )}
        </>
      </Button>
    );
  }
);

LoginBtn.displayName = "LoginBtn";

export { LoginBtn };
