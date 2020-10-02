import { statsPageComponent } from './pages/stats-page.component';
import { homePageComponent } from './pages/home-page.component';
import { notFoundPageComponent } from './pages/404-page.componennt';
import { cardListPageComponent } from './pages/card-list-page.component';

export const appRoutes = [
  { path: '', component: notFoundPageComponent },
  {
    path: [
      'action-a',
      'action-b',
      'outdoors',
      'house',
      'animal-a',
      'animal-b',
      'clothes',
      'emotion',
      'repeat',
    ],
    component: cardListPageComponent,
  },
  { path: ['/'], component: homePageComponent },
  { path: ['stats'], component: statsPageComponent },
];
