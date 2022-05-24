import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {QuestionnaireAlzService} from '../../../services/questionnaireAlz.service';
import {User} from '../../../models/user.model';
import {QuizGameDmla} from '../../../models/quizgameDmla.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {QuizGame} from '../../../models/quizgame.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-menu-questionnaire-alz',
  templateUrl: './menu-questionnaire-alz.component.html',
  styleUrls: ['./menu-questionnaire-alz.component.scss']
})
export class MenuQuestionnaireAlzComponent implements OnInit {

  public themeList: string[] = [];

  public questionnaireList: string[] = [];

  public quizGameForm: FormGroup;

  public quizSelec: Quiz;
  public user: User;
  public quizGameToCreate: QuizGame;

  public quizGameCreated: QuizGame;

  constructor(public formBuilder: FormBuilder, public QuestionnairealzService: QuestionnaireAlzService,
              public userService: UserService,
              private route: ActivatedRoute, private quizService: QuizService,
              private router: Router, public themeService: ThemeService,
              public datePipe: DatePipe) {

    const id = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(id);

    const theme = this.route.snapshot.paramMap.get('theme');
    this.themeService.setTheme(theme);

    this.QuestionnairealzService.setQuizzesFromUrlWithTheme(this.themeService.themeSelected);

    this.QuestionnairealzService.listQuestionnaire$.subscribe((questionnaireList: string[]) => {
      this.questionnaireList = questionnaireList;
    });

    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });

    this.quizService.game$.subscribe((quiz) => {
      this.quizGameCreated = quiz;
      if (this.quizGameCreated !== null) {
        this.quizSelected();
      }
    });

    this.quizGameForm = this.formBuilder.group({
      correctAnswers: ['0'],
      incorrectAnswers: ['0'],
      quizId: [''],
      type: [''],
      nbRepetition: [''],
      userId: [''],
      creationDate: [this.datePipe.transform(new Date(), 'dd/MM/yyyy')],
      answers: [],
    });
  }


  ngOnInit(): void {
  }

  selectQuestionnaire(theme: string): void {
    this.QuestionnairealzService.setQuestionnaire(theme);
    this.quizSelec = this.QuestionnairealzService.getQuestionnaireId(this.QuestionnairealzService.questionnaireSelected$.value);

    this.quizGameForm.controls.nbRepetition.setValue(String(this.quizSelec.nbRepetition));

    this.quizGameForm.controls.quizId.setValue(String(this.quizSelec._id));
    this.quizGameForm.controls.type.setValue(String(this.user.type));
    this.quizGameForm.controls.userId.setValue(String(this.user._id));


    console.log('this.quizGameForm.getRawValue(): ', this.quizGameForm.getRawValue());

    this.quizGameToCreate = this.quizGameForm.getRawValue() as QuizGame;

    console.log('quizGameToCreate: ', this.quizGameToCreate);

    this.quizService.addQuizGame(this.quizGameToCreate);
  }

  quizSelected(): void {
    console.log('quizSelected');
    this.router.navigate(['/quiz-gameAlz/' + this.quizGameCreated._id]);
  }
}
