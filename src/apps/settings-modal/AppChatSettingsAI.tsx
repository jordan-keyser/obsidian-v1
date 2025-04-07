import * as React from 'react';
import { Box, FormControl, FormLabel, Select, Option, Typography, Slider, Switch } from '@mui/joy';

export function AppChatSettingsAI() {
  const [model, setModel] = React.useState('gpt-4');
  const [temperature, setTemperature] = React.useState(0.7);
  const [maxTokens, setMaxTokens] = React.useState(2000);
  const [enableStreaming, setEnableStreaming] = React.useState(true);
  const [enableContext, setEnableContext] = React.useState(true);

  const handleModelChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    if (newValue) setModel(newValue);
  };

  const handleTemperatureChange = (event: Event, newValue: number | number[]) => {
    setTemperature(newValue as number);
  };

  const handleMaxTokensChange = (event: Event, newValue: number | number[]) => {
    setMaxTokens(newValue as number);
  };

  const handleStreamingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableStreaming(event.target.checked);
  };

  const handleContextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableContext(event.target.checked);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
      <Typography level="h4">AI Chat Settings</Typography>

      <FormControl>
        <FormLabel>Model</FormLabel>
        <Select value={model} onChange={handleModelChange}>
          <Option value="gpt-4">GPT-4</Option>
          <Option value="gpt-3.5-turbo">GPT-3.5 Turbo</Option>
          <Option value="claude-2">Claude 2</Option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Temperature ({temperature.toFixed(1)})</FormLabel>
        <Slider
          value={temperature}
          onChange={handleTemperatureChange}
          min={0}
          max={2}
          step={0.1}
          valueLabelDisplay="auto"
        />
        <Typography level="body-xs" sx={{ mt: 1 }}>
          Higher values make the output more random, lower values make it more focused
        </Typography>
      </FormControl>

      <FormControl>
        <FormLabel>Max Tokens ({maxTokens})</FormLabel>
        <Slider
          value={maxTokens}
          onChange={handleMaxTokensChange}
          min={100}
          max={4000}
          step={100}
          valueLabelDisplay="auto"
        />
        <Typography level="body-xs" sx={{ mt: 1 }}>
          Maximum number of tokens to generate in the response
        </Typography>
      </FormControl>

      <FormControl>
        <FormLabel>Streaming</FormLabel>
        <Switch
          checked={enableStreaming}
          onChange={handleStreamingChange}
          color="primary"
        />
        <Typography level="body-xs" sx={{ mt: 1 }}>
          Enable streaming responses for faster interaction
        </Typography>
      </FormControl>

      <FormControl>
        <FormLabel>Context Window</FormLabel>
        <Switch
          checked={enableContext}
          onChange={handleContextChange}
          color="primary"
        />
        <Typography level="body-xs" sx={{ mt: 1 }}>
          Include previous messages in the context for better conversation flow
        </Typography>
      </FormControl>
    </Box>
  );
} 