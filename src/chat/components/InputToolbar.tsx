import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AttachIcon from '@material-ui/icons/AttachFile';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';

import { makeStyles } from '@material-ui/core/styles';
import { CHAT_MESSAGE_INPUT } from '../../utils/test-helpers';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden' /* to prevent input borders from overflowing */,
  },
  input: {
    padding: theme.spacing(2),
    width: '100%',
    resize: 'none',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    outline: 0,
    border: 0,
    ...theme.typography.body1,
  },
  footer: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

interface InputToolbarProps {
  onSubmit: (message: string) => void;
}

export default function InputToolbar({ onSubmit }: InputToolbarProps) {
  const classes = useStyles();
  const intl = useIntl();
  const [message, setMessage] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.card}>
        <textarea
          value={message}
          onChange={handleChange}
          className={classes.input}
          rows={3}
          data-testid={CHAT_MESSAGE_INPUT}
        />
        <div className={classes.footer}>
          <div>
            <IconButton>
              <AttachIcon />
            </IconButton>
            <IconButton>
              <BookmarkIcon />
            </IconButton>
          </div>
          <Button
            variant="contained"
            color="primary"
            disabled={!message}
            onClick={handleSubmit}
          >
            {intl.formatMessage({
              id: 'common.send',
              defaultMessage: 'Send',
            })}
          </Button>
        </div>
      </Paper>
    </div>
  );
}
