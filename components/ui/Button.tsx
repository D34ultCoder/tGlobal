import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'outline';
  className?: string;
  textClassName?: string;
}

export function Button({
  title,
  variant = 'primary',
  className = '',
  textClassName = '',
  ...props
}: ButtonProps) {
  const baseStyle = "py-2 px-4 rounded-full items-center justify-center";
  const variantStyle = variant === 'primary'
    ? "bg-primary"
    : "border border-primary bg-transparent";

  const baseTextStyle = "font-medium text-sm";
  const variantTextStyle = variant === 'primary'
    ? "text-white"
    : "text-primary";

  const disabledStyle = props.disabled ? "opacity-50" : "";

  return (
    <TouchableOpacity
      className={`${baseStyle} ${variantStyle} ${disabledStyle} ${className}`}
      {...props}
    >
      <Text className={`${baseTextStyle} ${variantTextStyle} ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
