import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {QuizGameComponent} from './quizzes/quiz-game/quiz-game.component';
import {EditQuizDmlaComponent} from './quizzesDmla/edit-quizDmla/edit-quizDmla.component';
import {QuizGameDmlaComponent} from './quizzesDmla/quiz-gameDmla/quiz-gameDmla.component';
import {QuizListDmlaComponent} from './quizzesDmla/quiz-listDmla/quiz-listDmla.component';
import {MenuThemeDmlaComponent} from './menu/menu-theme/menu-theme-dmla/menu-theme-dmla.component';
import {MenuQuestionnaireComponent} from './menu/menu-questionnaire/menu-questionnaire.component';
import {SelectDeseaseComponent} from './menu/select-desease/select-desease.component';

const routes: Routes = [
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'quiz-game/:id', component: QuizGameComponent},
  {path: 'quiz-listDmla', component: QuizListDmlaComponent},
  {path: 'edit-quizDmla/:id', component: EditQuizDmlaComponent},
  {path: 'quiz-gameDmla/:id', component: QuizGameDmlaComponent},
  {path: 'menuTheme/menuThemeDmla', component: MenuThemeDmlaComponent},
  {path: 'menuTheme/menuThemeAlz', component: MenuThemeDmlaComponent},
  {path: 'menu/menuQuestionnaire', component: MenuQuestionnaireComponent},
  {path: 'select-desease', component: SelectDeseaseComponent},
  {path: '', redirectTo: '/select-desease', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
