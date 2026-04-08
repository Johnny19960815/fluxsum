import { DropdownMenu, type DropdownMenuProps, Icon } from '@fluxsum/ui';
import { createStaticStyles } from 'antd-style';
import { createLucideIcon, GlobeIcon, MoreHorizontal, PencilIcon, UploadIcon } from 'lucide-react';

const GithubIcon = createLucideIcon('Github', [
  ['path', { d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z', key: '1' }],
]);

const styles = createStaticStyles(({ css, cssVar }) => ({
  trigger: css`
    cursor: pointer;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    padding: 0;
    border: 1px solid ${cssVar.colorBorderSecondary};
    border-radius: 12px;

    color: ${cssVar.colorTextSecondary};

    background: ${cssVar.colorBgElevated};

    transition: all 150ms ${cssVar.motionEaseOut};

    &:hover {
      color: ${cssVar.colorText};
      background: ${cssVar.colorFillSecondary};
    }

    &:active {
      transform: translateY(1px);
    }

    &[data-state='open'],
    &[aria-expanded='true'] {
      color: ${cssVar.colorText};
      background: ${cssVar.colorFillTertiary};
    }
  `,
}));

const items: Exclude<DropdownMenuProps['items'], () => unknown> = [
  {
    desc: 'Import from a direct SKILL.md link',
    icon: <Icon icon={GlobeIcon} />,
    key: 'import-url',
    label: 'Import from URL',
  },
  {
    desc: 'Import from a public GitHub repository',
    icon: <Icon icon={GithubIcon} />,
    key: 'import-github',
    label: 'Import from GitHub',
  },
  {
    desc: 'Upload a local .zip or .skill file',
    icon: <Icon icon={UploadIcon} />,
    key: 'upload-zip',
    label: 'Upload Zip',
  },
  {
    desc: 'Manually configure a custom MCP server',
    icon: <Icon icon={PencilIcon} />,
    key: 'add-custom',
    label: 'Add Custom MCP Skill',
  },
];

export default () => {
  return (
    <DropdownMenu nativeButton iconAlign="start" items={items}>
      <button aria-label="Open menu" className={styles.trigger} type="button">
        <MoreHorizontal />
      </button>
    </DropdownMenu>
  );
};
