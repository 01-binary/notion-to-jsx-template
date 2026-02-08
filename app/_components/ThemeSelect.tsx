'use client';

import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { type Theme, themeAtom } from '@/atoms/theme';

const themeOptions: { value: Theme; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'system', label: 'System', icon: '🖥️' },
];

const triggerClassName = [
  'cursor-pointer rounded-lg p-2 transition-colors',
  'text-[rgb(var(--color-text-secondary))]',
  'hover:bg-[rgb(var(--color-bg-tertiary))] hover:text-[rgb(var(--color-text-primary))]',
].join(' ');

const dropdownBaseClassName = [
  'absolute right-0 top-full mt-1 min-w-[120px] rounded-lg py-1',
  'bg-[rgb(var(--color-bg-primary))] shadow-lg',
  'ring-1 ring-[rgb(var(--color-border))]',
  'transition-all duration-150',
].join(' ');

const optionClassName = [
  'flex w-full items-center gap-2 px-3 py-2 text-sm',
  'text-[rgb(var(--color-text-primary))]',
  'hover:bg-[rgb(var(--color-bg-tertiary))]',
  'cursor-pointer transition-colors',
].join(' ');

const ThemeSelect = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (value: Theme) => {
    setTheme(value);
    setIsOpen(false);
  };

  const currentOption = themeOptions.find((o) => o.value === theme)!;
  const dropdownClassName = `${dropdownBaseClassName} ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`;

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        type="button"
        className={triggerClassName}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current theme: ${theme}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentOption.icon}</span>
      </button>
      <div
        className={dropdownClassName}
        role="listbox"
      >
        {themeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={optionClassName}
            onClick={() => handleSelect(option.value)}
            role="option"
            aria-selected={theme === option.value}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
            {theme === option.value && <span className="ml-auto text-blue-500">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelect;
