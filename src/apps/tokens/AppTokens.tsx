import * as React from 'react';
import { Box, FormControl, Textarea, Typography } from '@mui/joy';

function generateColor(index: number) {
  const hue = ((index + 1) * 137.508) % 360;
  return `hsl(${hue}, 80%, 80%)`;
}

export function AppTokens() {
  const [text, setText] = React.useState('');
  const [tokenDetails, setTokenDetails] = React.useState<{ token: number, chunk: string, bytes: string }[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const updateTokenDetails = (text: string) => {
    // Simple tokenization for demonstration
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const details = words.map((word, index) => ({
      token: index + 1,
      chunk: word,
      bytes: new TextEncoder().encode(word).length.toString(),
    }));
    setTokenDetails(details);
  };

  React.useEffect(() => {
    updateTokenDetails(text);
  }, [text]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <Typography level="h4" sx={{ mb: 2 }}>Tokens</Typography>
      <Typography level="body-sm" sx={{ mb: 2 }}>
        Developer tool to see how AI reads your prompts, word by word.
      </Typography>

      <FormControl>
        <Typography level="title-sm" sx={{ mb: 1 }}>Text</Typography>
        <Textarea
          placeholder='Paste or type here...'
          value={text}
          onChange={handleTextChange}
          minRows={5}
          maxRows={10}
          endDecorator={
            <Box sx={{
              backgroundColor: 'background.surface',
              px: 0.5,
              py: 0.25,
              borderRadius: 'xs',
              width: '100%',
              lineHeight: 'lg',
              fontSize: 'xs',
              display: 'flex',
              flexFlow: 'row wrap',
              gap: 1,
              justifyContent: 'space-between',
            }}>
              <div>Token Count: {tokenDetails?.length || 0}</div>
              <div>Character Count: {text.length}</div>
            </Box>
          }
          sx={{
            '&:focus-within': { backgroundColor: 'background.popup' },
            mb: 1.5,
          }}
        />
      </FormControl>

      {tokenDetails.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
          <Box sx={{
            fontFamily: 'code',
            whiteSpace: 'pre-wrap',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            gap: 0.25,
          }}>
            {tokenDetails.map((detail, index) => (
              <Box key={index} sx={{
                backgroundColor: generateColor(index),
                borderRadius: '0.2rem',
                padding: '0.1rem',
                boxShadow: 'xs',
              }}>
                {detail.chunk}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {tokenDetails.length > 0 && (
        <Box>
          <Typography level='title-lg' sx={{ mb: 1 }}>Token Details</Typography>
          <Box sx={{
            fontSize: 'sm',
            lineHeight: 'lg',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            columnGap: 2,
            rowGap: 0.25,
          }}>
            <div><b>Number</b></div>
            <div><b>Bytes</b></div>
            <div><b>Chunks</b></div>
            {tokenDetails.map((detail, index) => (
              <React.Fragment key={'t-' + detail.token + '-i-' + index}>
                <div style={{ textAlign: 'right' }}>{detail.token}</div>
                <div>{detail.bytes}</div>
                <div>
                  <span style={{
                    whiteSpace: 'pre-wrap',
                    background: generateColor(index),
                    display: 'inline-block',
                    padding: '1px 4px',
                    borderRadius: '2px',
                  }}>{detail.chunk}</span>
                </div>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      )}

      <Typography level='body-sm' sx={{ mt: 2 }}>
        Understanding tokenization helps create more effective AI prompts.
      </Typography>
    </Box>
  );
} 