import * as React from 'react';
import { Box, Button, Card, CardContent, Divider, Input, Typography } from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import { useChatStore } from '../../stores/chat/chat.store';

const Centerer = (props: { backgroundColor: string, children?: React.ReactNode }) =>
  <Box sx={{
    backgroundColor: props.backgroundColor,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    flexGrow: 1,
  }}>
    {props.children}
  </Box>;

const ListPlaceholder = (props: { hasLinks: boolean }) =>
  <Box sx={{ p: { xs: 3, md: 6 } }}>
    <Card>
      <CardContent>
        <Typography level='title-md'>
          Shared Conversations
        </Typography>
        <Typography level='body-sm'>
          {props.hasLinks
            ? 'Here you can see formerly exported shared conversations. Please select a conversation from the drawer.'
            : 'No shared conversations found. Please export a conversation from this browser first.'}
        </Typography>
      </CardContent>
    </Card>
  </Box>;

const ShowLoading = () =>
  <Centerer backgroundColor='background.level1'>
    <Typography level='title-sm' sx={{ mt: 2 }}>
      Loading Chat...
    </Typography>
  </Centerer>;

const ShowError = (props: { error: any }) =>
  <Centerer backgroundColor='background.level1'>
    <Typography level='body-sm' color='danger'>
      {props.error?.message || 'An error occurred'}
    </Typography>
  </Centerer>;

export function AppLinkChat() {
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
  const [deleteConfirmKey, setDeleteConfirmKey] = React.useState<string | null>(null);
  const [sharedLinks, setSharedLinks] = React.useState<Array<{ id: string, title: string, deletionKey: string }>>([]);
  const { messages } = useChatStore();

  const handleDelete = React.useCallback(async (id: string, deletionKey: string) => {
    setDeleteConfirmId(null);
    setDeleteConfirmKey(null);

    // Delete from local storage
    setSharedLinks(prev => prev.filter(link => link.id !== id));

    // Show success message
    console.log('Link deleted successfully');
  }, []);

  const handleConfirmDeletion = React.useCallback((id: string) => id && setDeleteConfirmId(id), []);

  const handleCancelDeletion = React.useCallback(() => setDeleteConfirmId(null), []);

  const handleConfirmDeletionKey = React.useCallback(() => {
    if (!deleteConfirmId) return;

    // If we already have the key, we can delete right away
    const item = sharedLinks.find(i => i.id === deleteConfirmId);
    let deletionKey = item?.deletionKey;
    if (deletionKey)
      return handleDelete(deleteConfirmId, deletionKey);

    // Otherwise ask for the key
    setDeleteConfirmKey('');
  }, [deleteConfirmId, handleDelete, sharedLinks]);

  const handleCancelDeletionKey = React.useCallback(() => {
    setDeleteConfirmId(null);
    setDeleteConfirmKey(null);
  }, []);

  const handleDeletionKeyConfirmed = React.useCallback(() => {
    deleteConfirmId && deleteConfirmKey && handleDelete(deleteConfirmId, deleteConfirmKey);
  }, [deleteConfirmId, deleteConfirmKey, handleDelete]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography level="h4" sx={{ mb: 2 }}>Link Chat</Typography>
      <Typography level="body-sm" sx={{ mb: 2 }}>
        Share your conversations with others through links.
      </Typography>

      {sharedLinks.length === 0 ? (
        <ListPlaceholder hasLinks={false} />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sharedLinks.map(link => (
            <Card key={link.id}>
              <CardContent>
                <Typography level="title-md">{link.title}</Typography>
                <Button
                  variant="outlined"
                  color="danger"
                  onClick={() => handleConfirmDeletion(link.id)}
                  sx={{ mt: 1 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Delete confirmation */}
      {!!deleteConfirmId && (deleteConfirmKey === null) && (
        <Card>
          <CardContent>
            <Typography level="title-md">Confirm Deletion</Typography>
            <Typography level="body-sm" sx={{ mb: 2 }}>
              Are you sure you want to delete this link?
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" color="neutral" onClick={handleCancelDeletion}>
                Cancel
              </Button>
              <Button variant="solid" color="danger" onClick={handleConfirmDeletionKey}>
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Deletion Key Input */}
      {!!deleteConfirmId && (deleteConfirmKey !== null) && (
        <Card>
          <CardContent>
            <Typography level="title-md" startDecorator={<WarningRoundedIcon sx={{ color: 'danger.solidBg' }} />}>
              Enter Deletion Key
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography level="body-sm" sx={{ mb: 2 }}>
              You need to enter the original deletion key to delete this conversation.
            </Typography>
            <Input
              value={deleteConfirmKey}
              onChange={event => setDeleteConfirmKey(event.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="neutral" onClick={handleCancelDeletionKey}>
                Cancel
              </Button>
              <Button variant="solid" color="danger" onClick={handleDeletionKeyConfirmed}>
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
} 