import * as React from 'react';
import { Accordion, AccordionDetails, accordionDetailsClasses, AccordionGroup, AccordionSummary, accordionSummaryClasses, Avatar, Box, Button, ListItemContent, styled, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import MicIcon from '@mui/icons-material/Mic';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ScienceIcon from '@mui/icons-material/Science';
import SearchIcon from '@mui/icons-material/Search';

// configuration
const TAB_RADIUS = 'md';
const COLOR_TAB_LIST = 'primary';
const COLOR_TOPIC_ICON = 'primary';

// styled <AccordionGroup variant='plain'> into a Topics component
const Topics = styled(AccordionGroup)({
  borderRadius: `calc(var(--joy-radius-${TAB_RADIUS}) - 1px)`,
  overflow: 'hidden',

  [`& .${accordionSummaryClasses.button}`]: {
    minHeight: 64,
  },
  [`& .${accordionSummaryClasses.indicator}`]: {
    transition: '0.2s',
  },
  [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
    transform: 'rotate(45deg)',
  },

  [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]: {
    paddingBlock: '1rem',
  },
});

function Topic(props: { title?: React.ReactNode, icon?: string | React.ReactNode, startCollapsed?: boolean, children?: React.ReactNode }) {
  const [expanded, setExpanded] = React.useState(props.startCollapsed !== true);
  const hideTitleBar = !props.title && !props.icon;

  return (
    <Accordion
      expanded={expanded || hideTitleBar}
      onChange={(_event, expanded) => setExpanded(expanded)}
      sx={{
        '&:not(:last-child)': {
          borderBottomColor: 'primary.softActiveBg',
        },
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      {!hideTitleBar && (
        <AccordionSummary
          color='primary'
          variant={expanded ? 'plain' : 'soft'}
          indicator={<AddIcon />}
          slotProps={!expanded ? undefined : {
            button: { sx: { backgroundColor: 'rgba(var(--joy-palette-primary-lightChannel) / 0.2)' } },
          }}
        >
          {!!props.icon && (
            <Avatar
              color={COLOR_TOPIC_ICON}
              variant={expanded ? 'plain' : 'plain'}
            >
              {props.icon}
            </Avatar>
          )}
          <ListItemContent sx={{ color: `${COLOR_TOPIC_ICON}.softColor` }}>
            {props.title}
          </ListItemContent>
        </AccordionSummary>
      )}

      <AccordionDetails
        slotProps={{
          content: {
            sx: {
              px: { xs: 1.5, md: 2 },
            },
          },
        }}
      >
        <Box sx={{
          display: 'grid',
          gap: 2,
        }}>
          {props.children}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

const _styles = {
  modal: {
    backgroundColor: 'background.level1',
  } as const,

  tabs: {
    backgroundColor: 'transparent',
  } as const,

  tabsList: {
    backgroundColor: `${COLOR_TAB_LIST}.softHoverBg`,
    mb: 2,
    p: 0.5,
    borderRadius: TAB_RADIUS,
    fontSize: 'md',
    fontWeight: 'md',
    boxShadow: `inset 1px 1px 4px -3px var(--joy-palette-${COLOR_TAB_LIST}-solidHoverBg)`,
    gap: 0.5,
  } as const,

  tabsListTab: {
    borderRadius: 'sm',
    flex: 1,
    p: 0,
    '&[aria-selected="true"]': {
      bgcolor: 'background.popup',
      boxShadow: 'xs',
      fontWeight: 'lg',
      zIndex: 1,
    } as const,
  } as const,

  tabPanel: {
    boxShadow: 'xs',
    backgroundColor: 'background.surface',
    borderRadius: TAB_RADIUS,
    p: 0,
  } as const,
} as const;

export function SettingsModal(props: {
  open: boolean,
  tab: string,
  setTab: (index: string) => void,
  onClose: () => void,
  onOpenShortcuts: () => void,
}) {
  const handleSetTab = React.useCallback((_event: any, value: string | number | null) => {
    props.setTab((value ?? 'chat') as string);
  }, [props.setTab]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 2,
      }}
    >
      <Tabs
        aria-label='Settings tabbed menu'
        value={props.tab || 'chat'}
        onChange={handleSetTab}
        sx={_styles.tabs}
      >
        <TabList
          size='sm'
          disableUnderline
          sx={_styles.tabsList}
        >
          <Tab value='chat' disableIndicator sx={_styles.tabsListTab}>Chat</Tab>
          <Tab value='voice' disableIndicator sx={_styles.tabsListTab}>Voice</Tab>
          <Tab value='draw' disableIndicator sx={_styles.tabsListTab}>Draw</Tab>
          <Tab value='tools' disableIndicator sx={_styles.tabsListTab}>Tools</Tab>
        </TabList>

        <TabPanel value='chat' variant='outlined' sx={_styles.tabPanel}>
          <Topics>
            <Topic>
              <Box sx={{ p: 2 }}>
                <Button variant="outlined" color="neutral" onClick={props.onOpenShortcuts}>
                  Keyboard Shortcuts
                </Button>
              </Box>
            </Topic>
            <Topic icon={<AutoAwesomeIcon />} title="Chat AI" startCollapsed>
              <Box sx={{ p: 2 }}>
                <Typography level="body-sm">AI settings coming soon...</Typography>
              </Box>
            </Topic>
          </Topics>
        </TabPanel>

        <TabPanel value='voice' variant='outlined' sx={_styles.tabPanel}>
          <Topics>
            <Topic icon={<MicIcon />} title="Voice Input">
              <Box sx={{ p: 2 }}>
                <Typography level="body-sm">Voice input settings coming soon...</Typography>
              </Box>
            </Topic>
            <Topic icon={<RecordVoiceOverIcon />} title="Voice Output">
              <Box sx={{ p: 2 }}>
                <Typography level="body-sm">Voice output settings coming soon...</Typography>
              </Box>
            </Topic>
          </Topics>
        </TabPanel>

        <TabPanel value='draw' variant='outlined' sx={_styles.tabPanel}>
          <Topics>
            <Topic icon={<AutoAwesomeIcon />} title="Drawing">
              <Box sx={{ p: 2 }}>
                <Typography level="body-sm">Drawing settings coming soon...</Typography>
              </Box>
            </Topic>
          </Topics>
        </TabPanel>

        <TabPanel value='tools' variant='outlined' sx={_styles.tabPanel}>
          <Topics>
            <Topic icon={<SearchIcon />} title="Search">
              <Box sx={{ p: 2 }}>
                <Typography level="body-sm">Search settings coming soon...</Typography>
              </Box>
            </Topic>
            <Topic icon={<LanguageRoundedIcon />} title="Language">
              <Box sx={{ p: 2 }}>
                <Typography level="body-sm">Language settings coming soon...</Typography>
              </Box>
            </Topic>
            <Topic icon={<ScienceIcon />} title="Labs">
              <Box sx={{ p: 2 }}>
                <Typography level="body-sm">Experimental features coming soon...</Typography>
              </Box>
            </Topic>
          </Topics>
        </TabPanel>
      </Tabs>
    </Box>
  );
} 