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
import {MenuQuestionnaireAlzComponent} from './menu/menu-questionnaire-alz/menu-questionnaire-alz.component';
import {MenuThemeAlzComponent} from './menu/menu-theme/menu-theme-alz/menu-theme-alz.component';
import {TutoComponent} from './tuto/tuto.component';
import {MenuScoreComponent} from './menu/menu-score/menu-score.component';
import {ScoreComponent} from './scores/score/score.component';
import {UserListComponent} from './connexion/user-list/user-list.component';
import {MenuUserDMLAComponent} from './menu/menu-userDMLA/menu-userDMLA.component';
import {MenuUserALZComponent} from './menu/menu-userALZ/menu-userALZ.component';
import {AddUserComponent} from './connexion/addUser/addUser.component';
import {MenuSuperUserComponent} from './menu/menu-superUser/menu-superUser.component';
import {ScoreDMLAListComponent} from './scores/scoreDMLA-list/scoreDMLA-list.component';
import {QuizListDmla2Component} from "./quizzesDmla/quiz-listDmla2/quiz-listDmla2.component";

const routes: Routes = [
  {path: 'connexion', component: UserListComponent},

  {path: ':idUser/menuDMLA', component: MenuUserDMLAComponent},
  {path: ':idUser/menuDMLA/Theme', component: MenuThemeDmlaComponent},
  {path: ':idUser/menuDMLA/:theme/choixQuiz', component: MenuQuestionnaireComponent},

  {path: 'quiz-gameDmla/:idGame', component: QuizGameDmlaComponent},

  {path: ':idUser/menuUserALZ', component: MenuUserALZComponent},
  // {path: ':idUser/menuDMLA/Theme', component: MenuThemeDmlaComponent},  A FAIRE !!
  // {path: ':idUser/menuDMLA/:theme/choixQuiz', component: MenuQuestionnaireComponent},  A FAIRE !!

  {path: 'quiz-listDmla2', component: QuizListDmla2Component},

  {path: 'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'quiz-game/:id', component: QuizGameComponent},
  {path: 'quiz-listDmla', component: QuizListDmlaComponent},
  {path: 'edit-quizDmla/:id', component: EditQuizDmlaComponent},


  {path: 'menuTheme/menuThemeAlz', component: MenuThemeAlzComponent},

  {path: 'menu/menuQuestionnaireAlz', component: MenuQuestionnaireAlzComponent},
  {path: 'menu-score', component: MenuScoreComponent},
  {path: 'menu-score/:id', component: ScoreComponent },
  {path: 'select-desease', component: SelectDeseaseComponent},
  {path: 'tutoriel', component: TutoComponent},


  {path: 'ajoutUser', component: AddUserComponent},
  {path: 'menu/menuSuperUser', component: MenuSuperUserComponent},

  {path: 'menu-score/DMLA/:idU', component: ScoreDMLAListComponent},

  {path: '', redirectTo: '/connexion', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
