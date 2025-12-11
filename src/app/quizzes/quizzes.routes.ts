import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./quizzes.component').then((m) => m.QuizzesComponent),
  },
];
