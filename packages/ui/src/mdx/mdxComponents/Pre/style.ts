import { createStaticStyles } from 'antd-style';

export const styles = createStaticStyles(({ css }) => ({
  container: css`
    overflow: hidden;
    margin-block: calc(var(--flxsum-markdown-margin-multiple) * 0.5em);
    border-radius: calc(var(--flxsum-markdown-border-radius) * 1px);
    box-shadow: 0 0 0 1px var(--flxsum-markdown-border-color) inset;
  `,
}));
