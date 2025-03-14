import React, { Fragment } from 'react';
import Message from './Message';
import MessageDivider from './MessageDivider';
import useKabelwerk from '../../hooks/useKabelwerk';

const getMessagePosition = function (username: string) {
  // app usernames start with u- or auto-
  return /^(u-|auto-).*/i.test(username) ? 'left' : 'right';
};

const getDate = function (datetime: Date) {
  return datetime.toISOString().slice(0, 10);
};

export default function ChatMessagesList() {
  const { messages } = useKabelwerk();

  let output = [];
  let lastDate = null;

  for (let i = messages.length - 1; i >= 0; i--) {
    let message = messages[i];

    let messageDate = getDate(message.insertedAt);
    if (lastDate && messageDate !== lastDate) {
      output.push(<MessageDivider key={lastDate} content={lastDate} />);
      lastDate = messageDate;
    } else if (!lastDate) {
      // the first iteration
      lastDate = messageDate;
    }

    output.push(
      <Fragment key={message.id}>
        <Message
          position={getMessagePosition(message.user ? message.user.key : '')}
          message={message}
        />
      </Fragment>
    );
  }

  return (
    <>
      {output}
      {lastDate && <MessageDivider key={lastDate} content={lastDate} />}
    </>
  );
}
