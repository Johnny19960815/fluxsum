'use client';

import { cx, useThemeMode } from 'antd-style';
import {
  ArrowBigUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowRightToLineIcon,
  ArrowUpIcon,
  ChevronUpIcon,
  Command,
  CornerDownLeftIcon,
  createLucideIcon,
  Delete,
  Grid2X2Icon,
  MouseIcon,
  Option,
  SpaceIcon,
} from 'lucide-react';
import { memo, useEffect, useMemo, useState } from 'react';

import { Center, Flexbox } from '@/Flex';
import Icon from '@/Icon';

const LeftClickIcon = createLucideIcon('LeftClick', [
  ['path', { d: 'M2 9.333C2 6.36 3.491 3.71 5.814 2M19 10C19 9.08075 18.8189 8.1705 18.4672 7.32122C18.1154 6.47194 17.5998 5.70026 16.9497 5.05025C16.2997 4.40024 15.5281 3.88463 14.6788 3.53284C13.8295 3.18106 12.9193 3 12 3C11.0807 3 10.1705 3.18106 9.32122 3.53284C8.47194 3.88463 7.70026 4.40024 7.05025 5.05025C6.40024 5.70026 5.88463 6.47194 5.53284 7.32122C5.18106 8.1705 5 9.08075 5 10V14C5 14.9193 5.18106 15.8295 5.53284 16.6788C5.88463 17.5281 6.40024 18.2997 7.05025 18.9497C7.70026 19.5998 8.47194 20.1154 9.32122 20.4672C10.1705 20.8189 11.0807 21 12 21C12.9193 21 13.8295 20.8189 14.6788 20.4672C15.5281 20.1154 16.2997 19.5998 16.9497 18.9497C17.5998 18.2997 18.1154 17.5281 18.4672 16.6788C18.8189 15.8295 19 14.9193 19 14V10Z', key: '1' }],
  ['path', { d: 'M12 4V11H6', key: '2' }],
]);
const LeftDoubleClickIcon = createLucideIcon('LeftDoubleClick', [
  ['path', { d: 'M19 10V14C19 14.9193 18.8189 15.8295 18.4672 16.6788C18.1154 17.5281 17.5998 18.2997 16.9497 18.9497C16.2997 19.5998 15.5281 20.1154 14.6788 20.4672C13.8295 20.8189 12.9193 21 12 21C11.0807 21 10.1705 20.8189 9.32122 20.4672C8.47194 20.1154 7.70026 19.5998 7.05025 18.9497C6.40024 18.2997 5.88463 17.5281 5.53284 16.6788C5.18106 15.8295 5 14.9193 5 14V11M5 11V10C5 8.14348 5.7375 6.36301 7.05025 5.05025C8.36301 3.7375 10.1435 3 12 3V11H5ZM2 9.333C2 6.36 3.491 3.71 5.814 2M20.5 2H21.75C22.44 2 23 2.56 23 3.25C23 3.94 22.44 4.5 21.75 4.5C21.06 4.5 20.5 5.06 20.5 5.75V7H23M15 4L18 7M18 4L15 7', key: '1' }],
]);
const RightClickIcon = createLucideIcon('RightClick', [
  ['path', { d: 'M22 9.333C22 6.36 20.509 3.71 18.186 2M19 10C19 9.08075 18.8189 8.1705 18.4672 7.32122C18.1154 6.47194 17.5998 5.70026 16.9497 5.05025C16.2997 4.40024 15.5281 3.88463 14.6788 3.53284C13.8295 3.18106 12.9193 3 12 3C11.0807 3 10.1705 3.18106 9.32122 3.53284C8.47194 3.88463 7.70026 4.40024 7.05025 5.05025C6.40024 5.70026 5.88463 6.47194 5.53284 7.32122C5.18106 8.1705 5 9.08075 5 10V14C5 14.9193 5.18106 15.8295 5.53284 16.6788C5.88463 17.5281 6.40024 18.2997 7.05025 18.9497C7.70026 19.5998 8.47194 20.1154 9.32122 20.4672C10.1705 20.8189 11.0807 21 12 21C12.9193 21 13.8295 20.8189 14.6788 20.4672C15.5281 20.1154 16.2997 19.5998 16.9497 18.9497C17.5998 18.2997 18.1154 17.5281 18.4672 16.6788C18.8189 15.8295 19 14.9193 19 14V10Z', key: '1' }],
  ['path', { d: 'M12 4V11H18', key: '2' }],
]);
const RightDoubleClickIcon = createLucideIcon('RightDoubleClick', [
  ['path', { d: 'M12 3C13.8565 3 15.637 3.7375 16.9497 5.05025C18.2625 6.36301 19 8.14348 19 10V14C19 14.9193 18.8189 15.8295 18.4672 16.6788C18.1154 17.5281 17.5998 18.2997 16.9497 18.9497C16.2997 19.5998 15.5281 20.1154 14.6788 20.4672C13.8295 20.8189 12.9193 21 12 21C11.0807 21 10.1705 20.8189 9.32122 20.4672C8.47194 20.1154 7.70026 19.5998 7.05025 18.9497C6.40024 18.2997 5.88463 17.5281 5.53284 16.6788C5.18106 15.8295 5 14.9193 5 14V10', key: '1' }],
  ['path', { d: 'M12 3V11H18.5M22 9.333C22 6.36 20.509 3.71 18.186 2M6.5 2H7.75C8.44 2 9 2.56 9 3.25C9 3.94 8.44 4.5 7.75 4.5C7.06 4.5 6.5 5.06 6.5 5.75V7H9M1 4L4 7M4 4L1 7', key: '2' }],
]);

import { KeyMapEnum } from './const';
import { variants } from './style';
import type { HotkeyProps } from './type';
import { checkIsAppleDevice, splitKeysByPlus, startCase } from './utils';

const mappingKey = (isAppleDevice: boolean) => ({
  [KeyMapEnum.Alt]: isAppleDevice ? <Icon icon={Option} size={{ size: '0.95em' }} /> : 'Alt',
  [KeyMapEnum.Backspace]: isAppleDevice ? <Icon icon={Delete} /> : 'Backspace',
  [KeyMapEnum.CommandOrControl]: isAppleDevice ? (
    <Icon icon={Command} size={{ size: '0.95em' }} />
  ) : (
    'Ctrl'
  ),
  [KeyMapEnum.Ctrl]: isAppleDevice ? <Icon icon={ChevronUpIcon} /> : 'Ctrl',
  [KeyMapEnum.Control]: isAppleDevice ? <Icon icon={ChevronUpIcon} /> : 'Ctrl',
  [KeyMapEnum.Down]: <Icon icon={ArrowDownIcon} />,
  [KeyMapEnum.Enter]: isAppleDevice ? <Icon icon={CornerDownLeftIcon} /> : 'Enter',
  [KeyMapEnum.LeftClick]: <Icon icon={LeftClickIcon} size={{ size: '1.2em', strokeWidth: 1.75 }} />,
  [KeyMapEnum.Left]: <Icon icon={ArrowLeftIcon} />,
  [KeyMapEnum.Meta]: isAppleDevice ? (
    <Icon icon={Command} size={{ size: '0.95em' }} />
  ) : (
    <Icon icon={Grid2X2Icon} />
  ),
  [KeyMapEnum.MiddleClick]: <Icon icon={MouseIcon} size={{ size: '1.2em', strokeWidth: 1.75 }} />,
  [KeyMapEnum.Mod]: isAppleDevice ? <Icon icon={Command} size={{ size: '0.95em' }} /> : 'Ctrl',
  [KeyMapEnum.RightClick]: (
    <Icon icon={RightClickIcon} size={{ size: '1.2em', strokeWidth: 1.75 }} />
  ),
  [KeyMapEnum.RightDoubleClick]: (
    <Icon icon={RightDoubleClickIcon} size={{ size: '1.2em', strokeWidth: 1.75 }} />
  ),
  [KeyMapEnum.LeftDoubleClick]: (
    <Icon icon={LeftDoubleClickIcon} size={{ size: '1.2em', strokeWidth: 1.75 }} />
  ),
  [KeyMapEnum.Right]: <Icon icon={ArrowRightIcon} />,
  [KeyMapEnum.Shift]: isAppleDevice ? (
    <Icon icon={ArrowBigUpIcon} size={{ size: '1.15em', strokeWidth: 1.75 }} />
  ) : (
    'Shift'
  ),
  [KeyMapEnum.Space]: <Icon icon={SpaceIcon} />,
  [KeyMapEnum.Tab]: isAppleDevice ? <Icon icon={ArrowRightToLineIcon} /> : 'Tab',
  [KeyMapEnum.Up]: <Icon icon={ArrowUpIcon} />,
  [KeyMapEnum.Comma]: ',',
  [KeyMapEnum.Period]: '.',
  [KeyMapEnum.Slash]: '?',
  [KeyMapEnum.Semicolon]: ';',
  [KeyMapEnum.Quote]: "'",
  [KeyMapEnum.Backquote]: '`',
  [KeyMapEnum.Backslash]: '\\',
  [KeyMapEnum.BracketLeft]: '[',
  [KeyMapEnum.BracketRight]: ']',
  [KeyMapEnum.Minus]: '-',
  [KeyMapEnum.Equal]: '+',
});

const Hotkey = memo<HotkeyProps>(
  ({
    variant = 'filled',
    classNames,
    styles: customStyles,
    keys,
    inverseTheme,
    isApple,
    compact,
    className,
    style,
    ...rest
  }) => {
    const { isDarkMode } = useThemeMode();
    const isBorderless = variant === 'borderless';
    const [keysGroup, setKeysGroup] = useState(() => splitKeysByPlus(keys));
    const isAppleDevice = useMemo(() => checkIsAppleDevice(isApple), [isApple]);

    useEffect(() => {
      const newValue = splitKeysByPlus(keys);
      setKeysGroup(newValue);
    }, [keys]);

    const mapping: Record<string, any> = useMemo(() => mappingKey(isAppleDevice), [isAppleDevice]);

    return (
      <Flexbox
        horizontal
        align={'center'}
        className={className}
        gap={isBorderless ? 6 : 2}
        style={style}
        {...rest}
      >
        {compact || isBorderless ? (
          <Center
            horizontal
            as={'kbd'}
            gap={6}
            style={customStyles?.kbdStyle}
            className={cx(
              variants({ inverseTheme, isDarkMode, variant }),
              classNames?.kbdClassName,
            )}
          >
            {keysGroup.map((key, index) => (
              <div key={index}>{mapping[key] ?? startCase(key)}</div>
            ))}
          </Center>
        ) : (
          keysGroup.map((key, index) => (
            <Center
              as={'kbd'}
              key={index}
              style={customStyles?.kbdStyle}
              className={cx(
                variants({ inverseTheme, isDarkMode, variant }),
                classNames?.kbdClassName,
              )}
            >
              {mapping[key] ?? startCase(key)}
            </Center>
          ))
        )}
      </Flexbox>
    );
  },
);

Hotkey.displayName = 'Hotkey';

export default Hotkey;
