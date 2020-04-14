import { statsPageComponent } from './pages/stats-page.component';
import { homePageComponent } from './pages/home-page.component';
import { notFoundPageComponent } from './pages/404-page';
import { cardListPageComponent } from './pages/card-list-page.component';

export const appRoutes = [
  { path: '', component: notFoundPageComponent },
  { path: ['action-a',
      'action-b',
      'action-c',
      'adjective',
      'animal-a',
      'animal-b',
      'clothes',
      'emotion'], component: cardListPageComponent },
  { path: ['/'], component: homePageComponent },
  { path: 'list', component: statsPageComponent }
];
