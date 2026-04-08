'use client';

import { type CSSProperties, type ElementType, type FC, memo } from 'react';

import type { FlexBasicProps } from './type';
import { getCssValue, getFlexDirection, isHorizontal, isSpaceDistribution } from './utils';

const FlexBasic: FC<FlexBasicProps> = ({
  visible,
  flex,
  gap,
  direction,
  horizontal,
  align,
  justify,
  distribution,
  height,
  width,
  allowShrink,
  padding,
  paddingInline,
  paddingBlock,
  prefixCls,
  as: Container = 'div' as ElementType,
  className,
  style,
  children,
  wrap,
  ref,
  ...props
}) => {
  const justifyContent = justify || distribution;

  const calcWidth = () => {
    if (isHorizontal(direction, horizontal) && !width && isSpaceDistribution(justifyContent))
      return '100%';

    return getCssValue(width);
  };
  const finalWidth = calcWidth();

  const cssVars: Record<string, string | number> = {
    ...(flex !== undefined ? { '--flxsum-flex': String(flex) } : {}),
    ...(direction || horizontal
      ? { '--flxsum-flex-direction': getFlexDirection(direction, horizontal) }
      : {}),
    ...(wrap !== undefined ? { '--flxsum-flex-wrap': wrap } : {}),
    ...(justifyContent !== undefined ? { '--flxsum-flex-justify': justifyContent } : {}),
    ...(align !== undefined ? { '--flxsum-flex-align': align } : {}),
    ...(finalWidth !== undefined ? { '--flxsum-flex-width': finalWidth } : {}),
    ...(height !== undefined ? { '--flxsum-flex-height': getCssValue(height) } : {}),
    ...(padding !== undefined ? { '--flxsum-flex-padding': getCssValue(padding) } : {}),
    ...(paddingInline !== undefined
      ? { '--flxsum-flex-padding-inline': getCssValue(paddingInline) }
      : {}),
    ...(paddingBlock !== undefined
      ? { '--flxsum-flex-padding-block': getCssValue(paddingBlock) }
      : {}),
    ...(gap !== undefined ? { '--flxsum-flex-gap': getCssValue(gap) } : {}),
  };

  const mergedStyle: CSSProperties = {
    ...(cssVars as CSSProperties),
    ...(allowShrink ? { minWidth: 0 } : {}),
    ...style,
  };

  const baseClassName = 'flxsum-flex';
  const mergedClassName = [
    baseClassName,
    visible === false ? `${baseClassName}--hidden` : undefined,
    prefixCls ? `${prefixCls}-flex` : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Container ref={ref} {...props} className={mergedClassName} style={mergedStyle}>
      {children}
    </Container>
  );
};

export default memo(FlexBasic);
