import { useState } from 'react';
import { Box, Button, Group, Text, CopyButton, ActionIcon, Tooltip } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { Highlight, themes } from 'prism-react-renderer';

function CodeBlock({ code, language = 'javascript', title, showLineNumbers = false }) {
  return (
    <Box style={{ position: 'relative' }}>
      {title && (
        <Group justify="space-between" mb="xs">
          <Text size="sm" fw={500} c="dimmed">
            {title}
          </Text>
        </Group>
      )}
      
      <Box style={{ position: 'relative' }}>
        <CopyButton value={code} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="left">
              <ActionIcon
                color={copied ? 'teal' : 'gray'}
                variant="subtle"
                onClick={copy}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1,
                }}
              >
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>

        <Highlight
          theme={themes.github}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                padding: '1rem',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '14px',
                lineHeight: '1.5',
                border: '1px solid #e9ecef',
                margin: 0,
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {showLineNumbers && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '2em',
                        userSelect: 'none',
                        opacity: 0.5,
                        marginRight: '1em',
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </Box>
    </Box>
  );
}

export default CodeBlock;