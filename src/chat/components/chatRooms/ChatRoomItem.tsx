import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import truncate from 'lodash/truncate';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useKabelwerk from '../../hooks/useKabelwerk';
import { InboxItem } from '../../interfaces';

const toISODate = (dateTime: Date) => {
  return dateTime.toISOString().substring(0, 10);
};

const padTwo = (input: any) => {
  return input.toString().padStart(2, '0');
};

const formatDateTime = (dateTime: Date) => {
  const today = new Date();

  if (toISODate(today) === toISODate(dateTime)) {
    return `${padTwo(dateTime.getHours())}:${padTwo(dateTime.getMinutes())}`;
  } else {
    // @ts-ignore
    const formatter = new Intl.DateTimeFormat([], { month: 'short' });
    const month = formatter.format(dateTime);

    return `${dateTime.getDate()} ${month}`;
  }
};

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    backgroundColor: 'transparent',
    textDecoration: 'none',
    transition: `color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}, background-color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
    '&:hover': {
      color: '#150b2c',
      backgroundColor: 'rgba(216, 236, 235, 0.3)',
    },
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(),
    position: 'relative',
  },
  active: {
    position: 'relative',
    color: '#150b2c',
    backgroundColor: '#d8eceb',
    '&:before': {
      position: 'absolute',
      display: 'block',
      content: '""',
      top: 0,
      left: 0,
      width: 8,
      height: '100%',
      backgroundColor: '#a6d2d1',
    },
  },
  container: {
    display: 'flex',
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(),
  },
  inner: {
    marginRight: theme.spacing(2),
  },
  nickname: {
    fontWeight: 500,
    whiteSpace: 'pre-wrap',
  },
  unread: {
    fontWeight: 600,
  },
  dot: {
    backgroundColor: '#a6d2d1',
    borderRadius: 10,
    display: 'inline-block',
    height: 10,
    marginLeft: 5,
    width: 10,
  },
  timestamp: {
    position: 'absolute',
    right: 8,
    top: 10,
  },
  divder: { backgroundColor: '#d8eceb' },
}));

interface ChatRoomItemProps {
  inboxItem: InboxItem;
}

export default function ChatRoomItem({ inboxItem }: ChatRoomItemProps) {
  const classes = useStyles();
  const { selectRoom, selectCurrentInboxRoom } = useKabelwerk();

  return (
    <NavLink
      to={`/nutri/inbox/${inboxItem.room.id}`}
      className={classes.link}
      activeClassName={classes.active}
      onClick={() => {
        selectRoom(inboxItem.room.id);
        selectCurrentInboxRoom(inboxItem);
      }}
    >
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.inner}>
            <Typography className={classes.nickname}>
              {inboxItem.room.user.name}
              {inboxItem.isNew ? <span className={classes.dot}></span> : ''}
            </Typography>
            <Typography
              variant="body2"
              className={inboxItem.isNew ? classes.unread : ''}
            >
              {inboxItem.message
                ? truncate(inboxItem.message.text, { length: 60 })
                : ''}
            </Typography>
          </div>
        </div>
        <Typography variant="caption" className={classes.timestamp}>
          {inboxItem.message
            ? formatDateTime(inboxItem.message.insertedAt)
            : ''}
        </Typography>
      </div>
      <Divider className={classes.divder} />
    </NavLink>
  );
}
