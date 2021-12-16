import React from 'react';
import { Grid } from 'semantic-ui-react';
import HeaderPanel from './components/layout/HeaderPanel';
import SidePanel from './components/layout/SidePanel';
import ConfessionsList from './features/confession/ConfessionsList';

const App = () => {
  return (
    <div>
      <HeaderPanel />
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={5}>
            <SidePanel />
          </Grid.Column>
          <Grid.Column width={10}>
            <div style={{ position: 'absolute', top: 80, left: 30 }}>
              <ConfessionsList />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default App;
