'use client';

import { cx } from 'antd-style';
import { memo } from 'react';

import { styles } from './markdown.style';
import type { TypographyProps } from './type';

const Typography = memo<TypographyProps>(
  ({
    ref,
    children,
    className,
    fontSize = 16,
    headerMultiple = 1,
    marginMultiple = 2,
    lineHeight = 1.8,
    borderRadius = 8,
    style,
    ...rest
  }) => {
    return (
      <article
        className={cx(styles.root, className)}
        ref={ref}
        style={{
          // @ts-ignore
          '--flxsum-markdown-border-radius': borderRadius,
          '--flxsum-markdown-font-size': `${fontSize}px`,
          '--flxsum-markdown-header-multiple': headerMultiple,
          '--flxsum-markdown-line-height': lineHeight,
          '--flxsum-markdown-margin-multiple': marginMultiple,
          ...style,
        }}
        {...rest}
      >
        {children}
      </article>
    );
  },
);

Typography.displayName = 'Typography';

export default Typography;
