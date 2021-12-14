import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { getFirebase } from 'react-redux-firebase';
import { Button, Dropdown, Form, Message, Modal } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { tagOptions } from '../../utils/Tags';
import { createConfession } from './confessionSlice';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const AddConfessionForm = ({ open, handleClose }: Props) => {
  const [status, setStatus] = useState('idle');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<any | []>([]);
  const [shareAs, setShareAs] = useState<any | string>(' ');
  const [errors, setErrors] = useState<any>([]);

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const { profile }: any = useAppSelector((state) => state.firebase);

  const makeConfession = () => {
    if (canSave) {
      setStatus('pending');
      setErrors([]);
      dispatch(createConfession({ content, tags, shareAs, profile }))
        .then(unwrapResult)
        .then((result) => {
          setStatus('idle');
          setContent('');
          setTags([]);
          setShareAs('user');
          handleClose();
        })
        .catch((err) => {
          setErrors((prevErrors: any) => [...prevErrors, err]);
          setStatus('idle');
        });
    }
  };
  const canSave =
    [content, tags, shareAs].every(Boolean) &&
    tags.length >= 1 &&
    status === 'idle';

  const displayErrors = () =>
    errors.map((error: any, key: any) => <p key={key}>{error.message}</p>);

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>Let's Confess!</Modal.Header>
      <Modal.Description>
        <p
          style={{
            margin: '5px 0px 5px 10px',
            fontSize: '0.9rem',
            color: '#928D8E',
          }}
        >
          Share your confession{' '}
          <strong>
            <ins>Anonymously</ins>
          </strong>{' '}
          or{' '}
          <strong>
            <ins> Full name</ins>
          </strong>
        </p>
      </Modal.Description>
      <Modal.Content scrolling>
        <Form>
          <Form.TextArea
            id='content'
            label='What is your confession?'
            placeholder='Tell us everything...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Form.Group grouped>
            <label>How you would like to confess?</label>
            <Form.Radio
              label='Anonymously'
              value='anonymous'
              checked={shareAs === 'anonymous'}
              onChange={(e, { value }) => setShareAs(value)}
            />
            <Form.Radio
              label='Full Name'
              value='user'
              checked={shareAs === 'user'}
              onChange={(e, { value }) => setShareAs(value)}
            />
          </Form.Group>

          <Dropdown
            id='tags'
            selection
            clearable
            multiple
            header={<Dropdown.Header content={'Filter for tags'} icon='tags' />}
            value={tags}
            label='Which is the most suitable for your confession?'
            labeled
            options={tagOptions}
            onChange={(e, { value }) => setTags(value)}
            placeholder='Which is the most suitable for your confession?'
          />
        </Form>
        {errors.length > 0 && <Message error>{displayErrors()}</Message>}
      </Modal.Content>

      <Modal.Actions>
        <Button primary disabled={!canSave} onClick={() => makeConfession()}>
          Publish
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddConfessionForm;
