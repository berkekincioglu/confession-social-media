import React from 'react';
import { pickTagColor } from '../../utils/functions';
import moment from 'moment';
import maleAvatar from '../../images/male_avatar.png';
import femaleAvatar from '../../images/female_avatar.png';
import { Segment, Comment, Divider, Label, Icon } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { likeConfession, setCurrentCategory } from './confessionSlice';

const Confession = ({ confession }: any) => {
  const dispatch = useAppDispatch();
  const { currentUser }: any = useAppSelector((state) => state.auth);

  const handleLike = (confession: any) => {
    dispatch(likeConfession(confession));
  };
  const getUserAvatar = () => {
    const gender = confession.user.gender;

    let avatar = gender === 'female' ? femaleAvatar : maleAvatar;
    if (confession.shareAs === 'user') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      avatar = confession.user.photoURL ? confession.user.photoURL : avatar;
    }
    return <Comment.Avatar src={avatar} style={{ marginRight: '1em' }} />;
  };
  const timeFromNow = (timestamp: any) => moment(timestamp).fromNow();

  return (
    <Segment loading={!confession} style={{ width: '740px' }}>
      <Comment.Group style={{ marginLeft: '30px !important' }}>
        <Comment>
          {getUserAvatar()}
          <Comment.Content>
            {confession.shareAs === 'user' ? (
              <Comment.Author as='a'>{confession.user.username}</Comment.Author>
            ) : (
              <Comment.Author as='a'>Anonim</Comment.Author>
            )}
            <Comment.Metadata>
              <span>{timeFromNow(confession.timestamp)}</span>
            </Comment.Metadata>
            <span style={{ position: 'absolute', right: '-40px', top: '-7px' }}>
              <Icon
                name={
                  confession.favorites[currentUser.uid] === 1
                    ? 'heart'
                    : 'heart outline'
                }
                size='large'
              />
            </span>
            <Comment.Text>{confession.content}</Comment.Text>
            {confession.tags.map((prop: any, key: any) => (
              <Label
                key={key}
                as='a'
                basic
                size='tiny'
                color={pickTagColor(prop) as any}
                onClick={(event, data) => {
                  dispatch(setCurrentCategory(prop));
                }}
              >
                <span>{prop}</span>
              </Label>
            ))}

            <Divider />

            <Comment.Actions>
              <Comment.Action onClick={() => handleLike(confession)}>
                <Icon
                  name={
                    confession.feelings[currentUser.uid] === 1
                      ? 'thumbs up'
                      : 'thumbs up outline'
                  }
                />
                {confession.numberOfLikes}
              </Comment.Action>
              <Comment.Action>
                <Icon
                  name={
                    confession.feelings[currentUser.uid] === -1
                      ? 'thumbs up'
                      : 'thumbs up outline'
                  }
                />
                {confession.numberOfDislikes}
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Segment>
  );
};

export default Confession;
