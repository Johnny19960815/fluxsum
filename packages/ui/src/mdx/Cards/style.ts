import { createStaticStyles } from 'antd-style';

export const styles = createStaticStyles(({ css }) => {
  return {
    container: css`
      margin-block: calc(var(--flxsum-markdown-margin-multiple) * 1em);

      > div {
        margin: 0 !important;
      }
    `,
  };
});
