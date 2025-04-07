import * as React from 'react';
import { Box, Button, FormControl, FormLabel, Option, Select, Slider, Stack, Switch, Typography } from '@mui/joy';

export function VoiceSettings() {
  const [voiceEnabled, setVoiceEnabled] = React.useState(false);
  const [selectedVoice, setSelectedVoice] = React.useState('default');
  const [voiceRate, setVoiceRate] = React.useState(1);
  const [voicePitch, setVoicePitch] = React.useState(1);

  const handleVoiceEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoiceEnabled(event.target.checked);
  };

  const handleVoiceChange = (_event: any, value: string | null) => {
    setSelectedVoice(value || 'default');
  };

  const handleVoiceRateChange = (_event: Event, value: number | number[]) => {
    setVoiceRate(value as number);
  };

  const handleVoicePitchChange = (_event: Event, value: number | number[]) => {
    setVoicePitch(value as number);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography level="h4">Voice Settings</Typography>

      <FormControl>
        <FormLabel>Enable Voice</FormLabel>
        <Switch
          checked={voiceEnabled}
          onChange={handleVoiceEnabledChange}
          color="primary"
        />
      </FormControl>

      {voiceEnabled && (
        <>
          <FormControl>
            <FormLabel>Voice</FormLabel>
            <Select
              value={selectedVoice}
              onChange={handleVoiceChange}
              placeholder="Select a voice"
            >
              <Option value="default">Default</Option>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Speech Rate</FormLabel>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <Typography>0.5x</Typography>
              <Slider
                value={voiceRate}
                onChange={handleVoiceRateChange}
                min={0.5}
                max={2}
                step={0.1}
                valueLabelDisplay="auto"
              />
              <Typography>2x</Typography>
            </Stack>
          </FormControl>

          <FormControl>
            <FormLabel>Voice Pitch</FormLabel>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <Typography>Low</Typography>
              <Slider
                value={voicePitch}
                onChange={handleVoicePitchChange}
                min={0.5}
                max={2}
                step={0.1}
                valueLabelDisplay="auto"
              />
              <Typography>High</Typography>
            </Stack>
          </FormControl>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              // Test voice settings
              const utterance = new SpeechSynthesisUtterance('This is a test of the voice settings.');
              utterance.rate = voiceRate;
              utterance.pitch = voicePitch;
              window.speechSynthesis.speak(utterance);
            }}
          >
            Test Voice
          </Button>
        </>
      )}
    </Box>
  );
} 