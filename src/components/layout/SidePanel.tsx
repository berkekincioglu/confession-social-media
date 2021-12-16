import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentCategory } from '../../features/confession/confessionSlice';

import * as Tag from '../../utils/Tags';
const SidePanel = () => {
  const dispatch = useAppDispatch();
  const { currentCategory } = useAppSelector((state) => state.confessions);

  const handleMenuItemClick = (
    name: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    dispatch(setCurrentCategory(name));
  };
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
          <Menu.Item
            name={Tag.ALL}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.ALL}
            onClick={(e) => handleMenuItemClick(Tag.ALL, e)}
          />
          <Menu.Item
            name={Tag.REGRET}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.REGRET}
            onClick={(e) => handleMenuItemClick(Tag.REGRET, e)}
          />
          <Menu.Item
            name={Tag.FIRST_EXPERIENCE}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.FIRST_EXPERIENCE}
            onClick={(e) => handleMenuItemClick(Tag.FIRST_EXPERIENCE, e)}
          />
          <Menu.Item
            name={Tag.SAD}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.SAD}
            onClick={(e) => handleMenuItemClick(Tag.SAD, e)}
          />
          <Menu.Item
            name={Tag.GUILTY}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.GUILTY}
            onClick={(e) => handleMenuItemClick(Tag.GUILTY, e)}
          />
          <Menu.Item
            name={Tag.LOVE}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.LOVE}
            onClick={(e) => handleMenuItemClick(Tag.LOVE, e)}
          />
          <Menu.Item
            name={Tag.HAPPY}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.HAPPY}
            onClick={(e) => handleMenuItemClick(Tag.HAPPY, e)}
          />
          <Menu.Item
            name={Tag.CHEATING}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.CHEATING}
            onClick={(e) => handleMenuItemClick(Tag.CHEATING, e)}
          />
          <Menu.Item
            name={Tag.MOCKING}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.MOCKING}
            onClick={(e) => handleMenuItemClick(Tag.MOCKING, e)}
          />
          <Menu.Item
            name={Tag.SEXUAL_ABUSE}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.SEXUAL_ABUSE}
            onClick={(e) => handleMenuItemClick(Tag.SEXUAL_ABUSE, e)}
          />
          <Menu.Item
            name={Tag.CONGRATULATIONS}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.CONGRATULATIONS}
            onClick={(e) => handleMenuItemClick(Tag.CONGRATULATIONS, e)}
          />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Special Categories</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            name={Tag.NOT_ANONYMOUS}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.NOT_ANONYMOUS}
            onClick={(e) => handleMenuItemClick(Tag.NOT_ANONYMOUS, e)}
          />
          <Menu.Item
            name={Tag.ONLY_ANONYMOUS}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.ONLY_ANONYMOUS}
            onClick={(e) => handleMenuItemClick(Tag.ONLY_ANONYMOUS, e)}
          />
          <Menu.Item
            name={Tag.MOST_APPROVED}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.MOST_APPROVED}
            onClick={(e) => handleMenuItemClick(Tag.MOST_APPROVED, e)}
          />
          <Menu.Item
            name={Tag.MOST_JUDGED}
            as='a'
            icon='hashtag'
            active={currentCategory === Tag.MOST_JUDGED}
            onClick={(e) => handleMenuItemClick(Tag.MOST_JUDGED, e)}
          />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default SidePanel;
