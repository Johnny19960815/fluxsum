import { createStaticStyles } from 'antd-style';

export const styles = createStaticStyles(({ css, cssVar }) => ({
  arrow: css`
    --flxsum-tooltip-arrow-offset-block: 4px;
    --flxsum-tooltip-arrow-offset-inline: 6px;

    pointer-events: none;

    position: absolute;
    transform-origin: center;

    display: flex;

    width: 8px;
    height: 4px;

    & > svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: ${cssVar.colorBgElevated};
    }

    & [data-role='stroke'] {
      stroke: ${cssVar.colorBorderSecondary};
    }

    &[data-side='top'] {
      inset-block-end: calc(var(--flxsum-tooltip-arrow-offset-block) * -1);
      transform: rotate(180deg);
    }

    &[data-side='left'] {
      inset-inline-end: calc(var(--flxsum-tooltip-arrow-offset-inline) * -1);
      transform: rotate(90deg);
    }

    &[data-side='right'] {
      inset-inline-start: calc(var(--flxsum-tooltip-arrow-offset-inline) * -1);
      transform: rotate(-90deg);
    }

    &[data-side='bottom'] {
      inset-block-start: calc(var(--flxsum-tooltip-arrow-offset-block) * -1);
    }
  `,

  popup: css`
    user-select: none;

    position: relative;
    transform-origin: var(--transform-origin);

    max-width: min(320px, var(--available-width));
    border: 1px solid ${cssVar.colorFill};
    border-radius: ${cssVar.borderRadiusSM};

    font-size: ${cssVar.fontSizeSM};
    line-height: 1.2;
    color: ${cssVar.colorTextLabel};

    background: ${cssVar.colorBgElevated};
    box-shadow:
      0 1px 2px 0 rgba(0, 0, 0, 3%),
      0 1px 6px -1px rgba(0, 0, 0, 2%),
      0 2px 4px 0 rgba(0, 0, 0, 2%);

    transition-timing-function: var(--flxsum-tooltip-animation-ease-out);
    transition-duration: var(--flxsum-tooltip-animation-duration);
    transition-property: opacity;

    &[data-layout-animation] {
      transition-property: opacity, transform, width, height;
    }

    &[data-starting-style],
    &[data-ending-style] {
      transform: translate3d(var(--flxsum-tooltip-translate-x), var(--flxsum-tooltip-translate-y), 0)
        scale(var(--flxsum-tooltip-animation-scale));
      opacity: 0;
    }

    &[data-ending-style] {
      transition-timing-function: var(--flxsum-tooltip-animation-ease-in);
      transition-duration: var(--flxsum-tooltip-animation-duration-exit);
    }

    &[data-instant] {
      transition: none;
    }
  `,

  positioner: css`
    --flxsum-tooltip-animation-duration: 100ms;
    --flxsum-tooltip-animation-duration-exit: 60ms;
    --flxsum-tooltip-animation-translate: 2px;
    --flxsum-tooltip-animation-scale: 0.98;
    --flxsum-tooltip-animation-ease-in: ease-in;
    --flxsum-tooltip-animation-ease-out: ${cssVar.motionEaseOut};
    --flxsum-tooltip-translate-x: 0;
    --flxsum-tooltip-translate-y: calc(var(--flxsum-tooltip-animation-translate) * -1);

    will-change: transform, opacity;

    z-index: 114514;

    width: min(var(--positioner-width), 320px, var(--available-width));
    height: var(--positioner-height);

    transition-timing-function: var(--flxsum-tooltip-animation-ease-out);
    transition-duration: var(--flxsum-tooltip-animation-duration);
    transition-property: none;

    &[data-layout-animation] {
      transition-property:
        inset-block-start, inset-inline-start, inset-inline-end, inset-block-end, transform;
    }

    &[data-instant] {
      transition: none;
    }

    /* Fallback: never show a tooltip when the anchor is hidden or the positioner falls back to (0,0). */
    &[data-anchor-hidden],
    &[data-zero-origin='true'] {
      pointer-events: none;
      visibility: hidden;
    }

    &[data-placement='top'],
    &[data-placement='topLeft'],
    &[data-placement='topRight'] {
      --flxsum-tooltip-translate-x: 0;
      --flxsum-tooltip-translate-y: var(--flxsum-tooltip-animation-translate);
    }

    &[data-placement='bottom'],
    &[data-placement='bottomLeft'],
    &[data-placement='bottomRight'] {
      --flxsum-tooltip-translate-x: 0;
      --flxsum-tooltip-translate-y: calc(var(--flxsum-tooltip-animation-translate) * -1);
    }

    &[data-placement='left'],
    &[data-placement='leftTop'],
    &[data-placement='leftBottom'] {
      --flxsum-tooltip-translate-x: var(--flxsum-tooltip-animation-translate);
      --flxsum-tooltip-translate-y: 0;
    }

    &[data-placement='right'],
    &[data-placement='rightTop'],
    &[data-placement='rightBottom'] {
      --flxsum-tooltip-translate-x: calc(var(--flxsum-tooltip-animation-translate) * -1);
      --flxsum-tooltip-translate-y: 0;
    }
  `,

  viewport: css`
    --flxsum-tooltip-viewport-inline-padding: 8px;

    position: relative;

    overflow: clip;
    display: flex;
    gap: 6px;
    align-items: center;

    max-width: var(--available-width);
    padding-block: 4px;
    padding-inline: var(--flxsum-tooltip-viewport-inline-padding);

    word-break: break-word;
    white-space: normal;

    [data-previous],
    [data-current] {
      transform: translateX(0);

      display: flex;
      gap: 6px;
      align-items: center;

      opacity: 1;

      transition:
        transform var(--flxsum-tooltip-animation-duration) var(--flxsum-tooltip-animation-ease-out),
        opacity calc(var(--flxsum-tooltip-animation-duration) / 2)
          var(--flxsum-tooltip-animation-ease-out);
    }

    [data-previous] {
      position: absolute;
      inset-block-start: 4px;
      inset-inline-start: var(--flxsum-tooltip-viewport-inline-padding);
    }

    &[data-activation-direction~='right'] [data-previous][data-ending-style] {
      transform: translateX(-50%);
      opacity: 0;
    }

    &[data-activation-direction~='right'] [data-current][data-starting-style] {
      transform: translateX(50%);
      opacity: 0;
    }

    &[data-activation-direction~='left'] [data-previous][data-ending-style] {
      transform: translateX(50%);
      opacity: 0;
    }

    &[data-activation-direction~='left'] [data-current][data-starting-style] {
      transform: translateX(-50%);
      opacity: 0;
    }

    &[data-activation-direction~='down'] [data-previous][data-ending-style] {
      transform: translateY(-50%);
      opacity: 0;
    }

    &[data-activation-direction~='down'] [data-current][data-starting-style] {
      transform: translateY(50%);
      opacity: 0;
    }

    &[data-activation-direction~='up'] [data-previous][data-ending-style] {
      transform: translateY(50%);
      opacity: 0;
    }

    &[data-activation-direction~='up'] [data-current][data-starting-style] {
      transform: translateY(-50%);
      opacity: 0;
    }
  `,
}));
