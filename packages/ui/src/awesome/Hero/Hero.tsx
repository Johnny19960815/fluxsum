'use client';

import { ConfigProvider } from 'antd';
import { useResponsive } from 'antd-style';
import { memo, useCallback } from 'react';

import A from '@/A';
import AuroraBackground from '@/awesome/AuroraBackground';
import GradientButton from '@/awesome/GradientButton';
import Button from '@/Button';
import { Center, Flexbox } from '@/Flex';

import { styles } from './style';
import { type HeroProps } from './type';

const GithubIcon = () => (
  <svg fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const Hero = memo<HeroProps>(({ title, description, actions, Link }) => {
  const { mobile } = useResponsive();

  const LinkRender = Link || A;

  const ButtonGroups = useCallback(
    () =>
      Boolean(actions?.length) && (
        <Flexbox horizontal className={styles.actions} gap={16} justify={'center'}>
          {actions!.map(({ text, link, openExternal, github, type }, index) => {
            const content =
              type === 'primary' ? (
                <GradientButton
                  block={mobile}
                  icon={github ? GithubIcon : undefined}
                  key={index}
                  size="large"
                >
                  {text}
                </GradientButton>
              ) : (
                <Button
                  block={mobile}
                  icon={github ? GithubIcon : undefined}
                  key={index}
                  size="large"
                  type="primary"
                >
                  {text}
                </Button>
              );

            return openExternal ? (
              <A href={link} key={text} target={openExternal ? '_blank' : undefined}>
                {content}
              </A>
            ) : (
              <LinkRender key={text} to={link}>
                {content}
              </LinkRender>
            );
          })}
        </Flexbox>
      ),
    [actions],
  );

  return (
    <>
      <AuroraBackground />
      <ConfigProvider theme={{ token: { fontSize: 16 } }}>
        <Flexbox align={'center'} style={{ zIndex: 1 }}>
          <Flexbox horizontal className={styles.container} distribution={'center'}>
            <Center>
              {title && (
                <Center
                  horizontal
                  as={'h1'}
                  className={styles.title}
                  dangerouslySetInnerHTML={{ __html: title }}
                  gap={'0.25em'}
                  wrap={'wrap'}
                />
              )}
              {description && (
                <p className={styles.desc} dangerouslySetInnerHTML={{ __html: description }} />
              )}
              <ButtonGroups />
            </Center>
          </Flexbox>
        </Flexbox>
      </ConfigProvider>
    </>
  );
});

Hero.displayName = 'Hero';

export default Hero;
