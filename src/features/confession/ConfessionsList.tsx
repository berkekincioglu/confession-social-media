import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchConfessions } from './confessionSlice';
import Confession from './Confession';
import {
  ALL,
  NOT_ANONYMOUS,
  ONLY_ANONYMOUS,
  MOST_APPROVED,
  MOST_JUDGED,
} from '../../utils/Tags';

interface Props {
  searchTerm: string;
}

const ConfessionsList = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { searchTerm } = useAppSelector((state) => state.confessions);
  const { confessions, loading, currentCategory } = useAppSelector(
    (state) => state.confessions
  );

  useEffect(() => {
    if (loading === 'idle') dispatch(fetchConfessions());
  }, [dispatch]);

  const applySpecialFilter = (confessions: any) => {
    switch (currentCategory) {
      case ONLY_ANONYMOUS:
        return confessions.filter(
          (confession: any) => confession.shareAs === 'anonymous'
        );
      case NOT_ANONYMOUS:
        return confessions.filter(
          (confession: any) => confession.shareAs === 'user'
        );
      case MOST_APPROVED:
        return confessions
          .slice()
          .sort((a: any, b: any) => b.numberOfLikes - a.numberOfLikes);
      case MOST_JUDGED:
        return confessions
          .slice()
          .sort((a: any, b: any) => b.numberOfDislikes - a.numberOfDislikes);
    }
  };

  const prepareConfessions = (confessions: any) => {
    const specials = [
      NOT_ANONYMOUS,
      ONLY_ANONYMOUS,
      MOST_APPROVED,
      MOST_JUDGED,
    ];
    let ordered = confessions
      .slice()
      .sort((a: any, b: any) => b.timestamp - a.timestamp);

    if (currentCategory !== ALL) {
      if (specials.includes(currentCategory)) {
        // Özel filtre uygula
        ordered = applySpecialFilter(ordered);
      } else {
        // Genel filtre uygula
        ordered = ordered.filter((confession: any) =>
          confession.tags.some((tag: any) => tag === currentCategory)
        );
      }
    }

    if (searchTerm !== '') {
      const regex = new RegExp(searchTerm, 'gi');
      ordered = ordered.slice().reduce((acc: any, confession: any) => {
        const {
          content,
          user: { username },
          shareAs,
        } = confession;

        if (
          [content, username].some((i) => i.match(regex)) &&
          shareAs !== 'anonymous'
        ) {
          acc.push(confession);
        }
        return acc;
      }, []);
    }
    return ordered;
  };

  return (
    <div
      style={{
        margin: '50px 0px',
      }}
    >
      {prepareConfessions(confessions).map((confession: any) => (
        <Confession key={confession.id} confession={confession} />
      ))}
    </div>
  );
};

export default ConfessionsList;
