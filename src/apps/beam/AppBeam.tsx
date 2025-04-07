import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Box, Button, Typography } from '@mui/joy';

import { BeamStoreApi, useBeamStore } from './store-beam.hooks';
import { BeamView } from './BeamView';
import { createBeamVanillaStore } from './store-beam';
import { createDConversation, DConversation } from '../../stores/chat/chat.conversation';
import { createDMessageTextContent, DMessage } from '../../stores/chat/chat.message';
import { useIsMobile } from '../../hooks/useIsMobile';

function initTestConversation(): DConversation {
  const conversation = createDConversation();
  conversation.messages.push(createDMessageTextContent('system', 'You are a helpful assistant.'));
  conversation.messages.push(createDMessageTextContent('user', 'Hello, who are you?'));
  return conversation;
}

function initTestBeamStore(messages: DMessage[], beamStore: BeamStoreApi = createBeamVanillaStore()): BeamStoreApi {
  beamStore.getState().open(messages);
  return beamStore;
}

export function AppBeam() {
  const [showDebug, setShowDebug] = React.useState(false);
  const [conversation, setConversation] = React.useState<DConversation>(() => initTestConversation());
  const [beamStoreApi] = React.useState(() => createBeamVanillaStore());

  React.useEffect(() => {
    initTestBeamStore(conversation.messages, beamStoreApi);
  }, [beamStoreApi, conversation]);

  const isMobile = useIsMobile();
  const { isOpen, beamState } = useBeamStore(beamStoreApi, useShallow(state => ({
    isOpen: state.isOpen,
    beamState: showDebug ? state : null,
  })));

  const handleClose = React.useCallback(() => {
    beamStoreApi.getState().terminateKeepingSettings();
  }, [beamStoreApi]);

  const toolbarItems = React.useMemo(() => (
    <>
      <Button size='sm' variant='plain' color='neutral' onClick={() => setShowDebug(on => !on)}>
        {showDebug ? 'Hide' : 'Show'} debug
      </Button>
      <Button size='sm' variant='plain' color='neutral' onClick={() => setConversation(initTestConversation())}>
        .open
      </Button>
      <Button size='sm' variant='plain' color='neutral' onClick={handleClose}>
        .close
      </Button>
    </>
  ), [handleClose, showDebug]);

  return (
    <>
      <div className="flex justify-end p-2">
        {toolbarItems}
      </div>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', position: 'relative' }}>
        {isOpen && (
          <BeamView
            beamStore={beamStoreApi}
            isMobile={isMobile}
          />
        )}

        {showDebug && (
          <Typography level='body-xs' sx={{
            whiteSpace: 'pre',
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            backdropFilter: 'blur(4px)',
            padding: '1rem',
          }}>
            {JSON.stringify(beamState, null, 2)}
          </Typography>
        )}
      </Box>
    </>
  );
} 