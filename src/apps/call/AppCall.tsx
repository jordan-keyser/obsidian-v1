import * as React from 'react';
import { Container, Sheet } from '@mui/joy';
import { useCallStore } from './store-call';

export interface CallIntent {
  conversationId: string | null;
  personaId: string;
  backTo: 'app-chat' | 'app-call-contacts';
}

export function AppCall() {
  // state
  const [callIntent, setCallIntent] = React.useState<CallIntent | null>(null);

  // external state
  const grayUI = useCallStore(state => state.grayUI);

  const hasIntent = !!callIntent && !!callIntent.personaId;

  return (
    <Sheet
      variant={grayUI ? 'solid' : 'soft'}
      invertedColors={grayUI ? true : undefined}
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        display: 'grid',
      }}>
      <Container
        maxWidth={hasIntent ? 'sm' : 'md'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: hasIntent ? 'space-evenly' : undefined,
          gap: hasIntent ? 1 : undefined,
          overflowY: hasIntent ? 'hidden' : undefined,
        }}>
        {!hasIntent ? (
          <div>Contacts Placeholder</div>
        ) : (
          <div>Call Wizard Placeholder</div>
        )}
      </Container>
    </Sheet>
  );
} 