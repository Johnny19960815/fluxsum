'use client';

import { createGlobalStyle, css } from 'antd-style';

/**
 * Register animatable custom properties used by scroll-driven animations.
 *
 * Without @property registration, custom properties interpolate discretely,
 * which can cause visible snapping at scroll boundaries.
 */
const ScrollAreaGlobalStyle = createGlobalStyle(
  () => css`
    @property --flxsum-scroll-area-fade-top {
      inherits: true;
      initial-value: 0;
      syntax: '<length>';
    }

    @property --flxsum-scroll-area-fade-bottom {
      inherits: true;
      initial-value: 0;
      syntax: '<length>';
    }
  `,
);

export default ScrollAreaGlobalStyle;
