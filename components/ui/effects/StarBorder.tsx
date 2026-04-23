'use client';

import type { CSSProperties, ElementType, ReactNode } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import './StarBorder.css';

type StarBorderProps<T extends ElementType> = {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: ReactNode;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className' | 'style'>;

const StarBorder = <T extends ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = as ?? 'button';
  const restStyle = (rest as { style?: CSSProperties }).style;

  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...restStyle,
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
