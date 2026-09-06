import React from 'react';

interface SCIInputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  error?: boolean;
  className?: string;
  autoComplete?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SCIInput({
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  label,
  error = false,
  className = '',
  autoComplete,
  onKeyPress,
}: SCIInputProps) {
  const baseClasses = 'block p-2 border rounded w-full box-border transition-colors';
  const borderColor = error ? 'border-red-500' : 'border-gray-300';
  const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-blue-500';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {label && (
        <label
          style={{
            fontWeight: '500',
            fontSize: '0.9em',
            color: error ? '#ef4444' : '#333',
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`${baseClasses} ${borderColor} ${focusClasses} ${disabledClasses} ${className}`}
        style={{
          borderColor: error ? '#ef4444' : undefined,
        }}
      />
      {error && (
        <span style={{ color: '#ef4444', fontSize: '0.85em' }}>
          Champ requis
        </span>
      )}
    </div>
  );
}
