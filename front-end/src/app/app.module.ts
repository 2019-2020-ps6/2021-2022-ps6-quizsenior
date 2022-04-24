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
import {SelectDeseaseComponent} from './menu/select-desease/select-desease.component';
import {MenuScoreComponent} from './menu/menu-score/menu-score.component';
import {ScoreComponent} from './scores/score/score.component';
import {ScoreListComponent} from './scores/score-list/score-list.component';


@NgModule({
  declarations: [
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
    SelectDeseaseComponent,
    MenuScoreComponent,
    ScoreComponent,
    ScoreListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
