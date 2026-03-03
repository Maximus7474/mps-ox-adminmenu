import { createHashRouter } from 'react-router';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard, GroupForm, Groups, PlayerDetails, Players } from './pages';
import { GroupDetails } from './pages/Groups/GroupDetails';

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
