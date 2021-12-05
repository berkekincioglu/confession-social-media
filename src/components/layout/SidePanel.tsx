import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import * as Tag from '../../utils/Tags';
const SidePanel = () => {
  const dispatch = useAppDispatch();

  return (
    <Menu
      vertical
      fixed='left'
      pointing
      style={{ marginTop: 61, fontSize: '18px' }}
    >
      <Menu.Item>
        <Menu.Header>Categories</Menu.Header>
        <Menu.Menu>
          <Menu.Item name={Tag.ALL} as='a' icon='hashtag' />
          <Menu.Item name={Tag.REGRET} as='a' icon='hashtag' />
          <Menu.Item name={Tag.FIRST_EXPERIENCE} as='a' icon='hashtag' />
          <Menu.Item name={Tag.SAD} as='a' icon='hashtag' />
          <Menu.Item name={Tag.GUILTY} as='a' icon='hashtag' />
          <Menu.Item name={Tag.LOVE} as='a' icon='hashtag' />
          <Menu.Item name={Tag.HAPPY} as='a' icon='hashtag' />
          <Menu.Item name={Tag.CHEATING} as='a' icon='hashtag' />
          <Menu.Item name={Tag.MOCKING} as='a' icon='hashtag' />
          <Menu.Item name={Tag.SEXUAL_ABUSE} as='a' icon='hashtag' />
          <Menu.Item name={Tag.CONGRATULATIONS} as='a' icon='hashtag' />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Special Categories</Menu.Header>
        <Menu.Menu>
          <Menu.Item name={Tag.NOT_ANONTMOUS} as='a' icon='hashtag' />
          <Menu.Item name={Tag.ONLY_ANONTMOUS} as='a' icon='hashtag' />
          <Menu.Item name={Tag.MOST_APPROVED} as='a' icon='hashtag' />
          <Menu.Item name={Tag.MOST_JUDGED} as='a' icon='hashtag' />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default SidePanel;
