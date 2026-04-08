import { css, type Theme } from 'antd-style';

import { CLASSNAMES } from '@/styles/classNames';

export default (token: Theme) => css`
  :root {
    --font-settings: 'cv01', 'tnum', 'kern';
    --font-variations: 'opsz' auto, tabular-nums;

    text-autospace: normal;
  }

  html {
    overscroll-behavior: none;
    color-scheme: ${token.isDarkMode ? 'dark' : 'light'};
  }

  body {
    overflow: hidden auto;

    min-height: 100vh;
    margin: 0;
    padding: 0;

    font-family: ${token.fontFamily};
    font-size: ${token.fontSize}px;
    font-feature-settings: var(--font-settings);
    font-variation-settings: var(--font-variations);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1;
    color: ${token.colorTextBase};
    text-size-adjust: none;
    text-rendering: optimizelegibility;
    word-wrap: break-word;
    vertical-align: baseline;

    background-color: ${token.colorBgLayout};

    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
  }

  code {
    font-family: ${token.fontFamilyCode} !important;

    span {
      font-family: ${token.fontFamilyCode} !important;
    }
  }

  ::selection {
    color: #000;
    background: ${token.yellow9};

    -webkit-text-fill-color: unset !important;
  }

  * {
    scrollbar-color: ${token.colorFill} transparent;
    scrollbar-width: thin;
    box-sizing: border-box;
    vertical-align: baseline;
  }

  @layer flxsum-popup {
    .${CLASSNAMES.ContextTrigger}[data-popup-open],
      .${CLASSNAMES.DropdownMenuTrigger}[data-popup-open] {
      background: ${token.colorFillTertiary};
    }
  }

  @layer flxsum-base {
    :where(.flxsum-flex) {
      /* Define defaults on the element itself to avoid CSS variable inheritance leaking to nested Flex */
      --flxsum-flex: 0 1 auto;
      --flxsum-flex-direction: column;
      --flxsum-flex-wrap: nowrap;
      --flxsum-flex-justify: flex-start;
      --flxsum-flex-align: stretch;
      --flxsum-flex-width: auto;
      --flxsum-flex-height: auto;
      --flxsum-flex-padding: 0;

      /* Keep padding-inline/block aligned with padding by default, and prevent inheriting from parent */
      --flxsum-flex-padding-inline: var(--flxsum-flex-padding);
      --flxsum-flex-padding-block: var(--flxsum-flex-padding);
      --flxsum-flex-gap: 0;

      display: flex;
      flex: var(--flxsum-flex);
      flex-flow: var(--flxsum-flex-direction) var(--flxsum-flex-wrap);
      gap: var(--flxsum-flex-gap);
      align-items: var(--flxsum-flex-align);
      justify-content: var(--flxsum-flex-justify);

      width: var(--flxsum-flex-width);
      height: var(--flxsum-flex-height);
      padding: var(--flxsum-flex-padding);
      padding-block: var(--flxsum-flex-padding-block);
      padding-inline: var(--flxsum-flex-padding-inline);
    }

    .flxsum-flex-hidden {
      display: none;
    }
  }

  /* Brand Loading */
  @keyframes draw {
    0% {
      stroke-dashoffset: 1000;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes fill {
    30% {
      fill-opacity: 0.05;
    }

    100% {
      fill-opacity: 1;
    }
  }

  .flxsum-brand-loading path {
    fill: currentcolor;
    fill-opacity: 0;
    stroke: currentcolor;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    stroke-width: 0.25em;

    animation:
      draw 2s cubic-bezier(0.4, 0, 0.2, 1) infinite,
      fill 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;
