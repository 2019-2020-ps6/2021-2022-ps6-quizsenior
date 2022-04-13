import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {QuizGameComponent} from './quizzes/quiz-game/quiz-game.component';
import {EditQuizDmlaComponent} from './quizzesDmla/edit-quizDmla/edit-quizDmla.component';
import {QuizGameDmlaComponent} from './quizzesDmla/quiz-gameDmla/quiz-gameDmla.component';
import {QuizListDmlaComponent} from './quizzesDmla/quiz-listDmla/quiz-listDmla.component';
import {MenuThemeComponent} from './menu/menu-theme/menu-theme.component';

const routes: Routes = [
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'quiz-game/:id', component: QuizGameComponent},
  {path: 'quiz-listDmla', component: QuizListDmlaComponent},
  {path: 'edit-quizDmla/:id', component: EditQuizDmlaComponent},
  {path: 'quiz-gameDmla/:id', component: QuizGameDmlaComponent},
  {path: 'nemuTheme', component: MenuThemeComponent},
  {path: '', redirectTo: '/quiz-listDmla', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
