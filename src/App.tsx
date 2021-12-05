import React from 'react';
import { Grid } from 'semantic-ui-react';
import HeaderPanel from './components/layout/HeaderPanel';
import SidePanel from './components/layout/SidePanel';

const App = () => {
  return (
    <div>
      <HeaderPanel />
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <SidePanel />
          </Grid.Column>
          <Grid.Column width={10}>{/* Main content */}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default App;
