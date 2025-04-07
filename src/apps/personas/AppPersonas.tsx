import * as React from 'react';
import { Box, Button, Card, Typography } from '@mui/joy';
import { useSimplePersonas, deleteSimplePersona, prependSimplePersona } from './store-personas';

export function AppPersonas() {
  const { simplePersonas } = useSimplePersonas();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <Typography level="h4" sx={{ mb: 2 }}>Personas</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {simplePersonas.length === 0 ? (
          <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
            <Typography level="body-lg">No personas created yet</Typography>
            <Typography level="body-sm" sx={{ mt: 1 }}>
              Create your first persona to get started
            </Typography>
          </Card>
        ) : (
          simplePersonas.map(persona => (
            <Card key={persona.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography level="title-lg">{persona.name || 'Unnamed Persona'}</Typography>
                  <Typography level="body-sm" sx={{ mt: 0.5 }}>
                    Created: {new Date(persona.creationDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Button
                  variant="soft"
                  color="danger"
                  size="sm"
                  onClick={() => deleteSimplePersona(persona.id)}
                >
                  Delete
                </Button>
              </Box>
              {persona.systemPrompt && (
                <Typography level="body-sm" sx={{ mt: 1 }}>
                  {persona.systemPrompt}
                </Typography>
              )}
            </Card>
          ))
        )}

        <Button
          variant="solid"
          color="primary"
          onClick={() => {
            prependSimplePersona(
              'You are a helpful assistant.',
              'Default persona',
              { type: 'text' }
            );
          }}
        >
          Create New Persona
        </Button>
      </Box>
    </Box>
  );
} 