import React, { Fragment, useState } from 'react';
import { Icon, Input, Menu, Image, Dropdown, Header } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutUser } from '../../features/auth/authSlice';
import AddConfessionForm from '../../features/confession/AddConfessionForm';
import logo from '../../images/logo.png';

const HeaderPanel = () => {
  const dispatch = useAppDispatch();
  const { currentUser }: any = useAppSelector((state) => state.auth);
  console.log(currentUser);

  const handleSignOut = () => {
    dispatch(logoutUser());
  };
  const [open, setOpen] = useState(false);

  const trigger = (
    <span>
      <Image avatar src={currentUser?.photoURL} />
    </span>
  );

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Fragment>
      <Menu fluid secondary pointing fixed='top'>
        <Menu.Item as='a' header color='pink'>
          <Image
            src={logo}
            size='mini'
            alt='app_logo'
            style={{ marginRight: '1.5em' }}
          />
          Confessor
        </Menu.Item>
        <Menu.Item name='search' position='right' color='pink'>
          <Input
            icon='search'
            placeholder='Search confessions...'
            size='large'
            style={{ width: '20em', marginBottom: '-3px' }}
          />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='make_confession' onClick={handleOpen}>
            <Icon name='pencil' size='big' />
            Confess
          </Menu.Item>
          <Menu.Item name='user'>
            <Dropdown trigger={trigger} pointing='top right'>
              <Dropdown.Menu>
                <Dropdown.Item key='user' icon='user' text='Profil' />
                <Dropdown.Item key='settings' icon='settings' text='Settings' />
                <Dropdown.Item
                  key='signout'
                  icon='sign out'
                  text='Sign out'
                  onClick={() => handleSignOut()}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <AddConfessionForm open={open} handleClose={handleClose} />
    </Fragment>
  );
};

export default HeaderPanel;
