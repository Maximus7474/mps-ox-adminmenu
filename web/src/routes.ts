import { createHashRouter } from 'react-router';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { Groups } from './pages/Groups';
import { GroupDetails } from './pages/GroupDetails';
import { Players } from './pages/Players';
import { PlayerDetails } from './pages/PlayerDetails';
import { GroupForm } from './pages/GroupForm';

export const router = createHashRouter([
  {
    path: '/',
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: 'groups',
        Component: Groups,
      },
      {
        path: 'groups/new',
        Component: GroupForm,
      },
      {
        path: 'groups/:groupId',
        Component: GroupDetails,
      },
      {
        path: 'groups/:groupId/edit',
        Component: GroupForm,
      },
      {
        path: 'players',
        Component: Players,
      },
      {
        path: 'players/:userId',
        Component: PlayerDetails,
      },
    ],
  },
]);
