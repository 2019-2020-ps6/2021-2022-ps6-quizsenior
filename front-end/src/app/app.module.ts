import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {QuizComponent} from './quizzes/quiz/quiz.component';
import {HeaderComponent} from './header/header.component';
import {QuizFormComponent} from './quizzes/quiz-form/quiz-form.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {AppRoutingModule} from './app.routing.module';
import {QuestionListComponent} from './questions/question-list/question-list.component';
import {QuestionFormComponent} from './questions/question-form/question-form.component';
import {QuestionComponent} from './questions/question/question.component';
import {QuizGameComponent} from './quizzes/quiz-game/quiz-game.component';
import {HttpClientModule} from '@angular/common/http';
import {BackgroundDirective} from '../background.directive';
import {QuizDmlaComponent} from './quizzesDmla/quizDmla/quizDmla.component';
import {QuizFormDmlaComponent} from './quizzesDmla/quiz-formDmla/quiz-formDmla.component';
import {EditQuizDmlaComponent} from './quizzesDmla/edit-quizDmla/edit-quizDmla.component';
import {QuizGameDmlaComponent} from './quizzesDmla/quiz-gameDmla/quiz-gameDmla.component';
import {QuizListDmlaComponent} from './quizzesDmla/quiz-listDmla/quiz-listDmla.component';
import {QuestionListDmlaComponent} from './questionsDmla/question-listDmla/question-listDmla.component';
import {QuestionFormDmlaComponent} from './questionsDmla/question-formDmla/question-formDmla.component';
import {QuestionDmlaComponent} from './questionsDmla/questionDmla/questionDmla.component';
import {MenuThemeDmlaComponent} from './menu/menu-theme/menu-theme-dmla/menu-theme-dmla.component';
import {MenuThemeAlzComponent} from './menu/menu-theme/menu-theme-alz/menu-theme-alz.component';
import {MenuQuestionnaireComponent} from './menu/menu-questionnaire/menu-questionnaire.component';
import {MenuQuestionnaireAlzComponent} from './menu/menu-questionnaire-alz/menu-questionnaire-alz.component';
// import {SelectDeseaseComponent} from './menu/select-desease/select-desease.component';
import {MenuScoreComponent} from './menu/menu-score/menu-score.component';
import {ScoreComponent} from './scores/score/score.component';
import {TutoComponent} from './tuto/tuto.component';
import {UserComponent} from './connexion/user/user.component';
import {UserListComponent} from './connexion/user-list/user-list.component';
import {MenuUserDMLAComponent} from './menu/menu-userDMLA/menu-userDMLA.component';
import {MenuUserALZComponent} from './menu/menu-userALZ/menu-userALZ.component';
import {AddUserComponent} from './connexion/addUser/addUser.component';
import {SuperUserComponent} from './connexion/superUser/superUser.component';
import {MenuSuperUserComponent} from './menu/menu-superUser/menu-superUser.component';
import {UserMenuScoreComponent} from './menu/userMenuScore/userMenuScore.component';
import {ScoreDMLAListComponent} from './scores/scoreDMLA-list/scoreDMLA-list.component';
import {DetailScoreDMLAComponent} from './scores/detailScoreDMLA/detailScoreDMLA.component';
import {QuizListDmla2Component} from './quizzesDmla/quiz-listDmla2/quiz-listDmla2.component';
import {DatePipe} from '@angular/common';
import {ScoreALZListComponent} from './scores/scoreALZ-list/scoreALZ-list.component';
import {DetailScoreALZComponent} from './scores/detailScoreALZ/detailScoreALZ.component';
import {AnswerGameDetailALZListComponent} from './scores/answerGameDetailALZ-list/answerGameDetailALZ-list.component';
import {AnswerGameDetailALZComponent} from './scores/answerGameDetailALZ/answerGameDetailALZ.component';


@NgModule({
  declarations: [
    AnswerGameDetailALZComponent,
    AnswerGameDetailALZListComponent,
    DetailScoreALZComponent,
    ScoreALZListComponent,
    QuizListDmla2Component,
    DetailScoreDMLAComponent,
    ScoreDMLAListComponent,
    UserMenuScoreComponent,
    MenuSuperUserComponent,
    SuperUserComponent,
    AddUserComponent,
    MenuUserALZComponent,
    MenuUserDMLAComponent,
    UserComponent,
    UserListComponent,
    QuestionListDmlaComponent,
    QuestionFormDmlaComponent,
    QuestionDmlaComponent,
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    QuizGameComponent,
    BackgroundDirective,
    QuizListDmlaComponent,
    QuizDmlaComponent,
    QuizFormDmlaComponent,
    EditQuizDmlaComponent,
    QuizGameDmlaComponent,
    MenuThemeDmlaComponent,
    MenuThemeAlzComponent,
    MenuQuestionnaireComponent,
    MenuQuestionnaireAlzComponent,
    // SelectDeseaseComponent,
    MenuScoreComponent,
    ScoreComponent,
    TutoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
