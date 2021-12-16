import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchConfessions } from './confessionSlice';
import Confession from './Confession';

const ConfessionsList = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { confessions, loading, currentCategory } = useAppSelector(
    (state) => state.confessions
  );

  useEffect(() => {
    if (loading === 'idle') dispatch(fetchConfessions());
  }, [dispatch]);

  const prepareConfessions = (confessions: any) => {
    let ordered = confessions
      .slice()
      .sort((a: any, b: any) => b.timestamp - a.timestamp);
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
