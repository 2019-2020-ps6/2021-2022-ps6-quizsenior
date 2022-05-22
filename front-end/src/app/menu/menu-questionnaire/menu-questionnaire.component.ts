import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {QuestionnaireService} from '../../../services/questionnaire.service';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuizGameDmla} from '../../../models/quizgameDmla.model';
import {QuizDmla} from '../../../models/quizDmla.model';
import {User} from '../../../models/user.model';
import {QuizServiceDmla} from '../../../services/quizDmla.service';

@Component({
  selector: 'app-menu-questionnaire',
  templateUrl: './menu-questionnaire.component.html',
  styleUrls: ['./menu-questionnaire.component.scss']
})
export class MenuQuestionnaireComponent implements OnInit {

  public themeList: string[] = [];

  public questionnaireList: string[] = [];

  public quizGameForm: FormGroup;

  public quizSelec: QuizDmla;
  public user: User;
  public quizGameToCreate: QuizGameDmla;

  public quizGameCreated: QuizGameDmla;

  constructor(public formBuilder: FormBuilder, public questionnaireService: QuestionnaireService,
              public themeService: ThemeService, public userService: UserService,
              private route: ActivatedRoute, private quizService: QuizServiceDmla,
              private router: Router) {

    const id = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(id);

    const theme = this.route.snapshot.paramMap.get('theme');
    this.themeService.setTheme(theme);

    this.questionnaireService.setQuizzesDMLAFromUrlWithTheme(this.themeService.themeSelected);

    this.questionnaireService.listQuestionnaire$.subscribe((questionnaireList: string[]) => {
      this.questionnaireList = questionnaireList;
    });

    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });

    this.quizService.gameSelected$.subscribe((quiz) => {
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
      userId: [''],
    });
  }

  ngOnInit(): void {
  }

  selectQuestionnaire(theme: string): void {
    this.questionnaireService.setQuestionnaire(theme);
    this.quizSelec = this.questionnaireService.getQuestionnaireId(this.questionnaireService.questionnaireSelected$.value);

    this.quizGameForm.controls.quizId.setValue(String(this.quizSelec._id));
    this.quizGameForm.controls.type.setValue(String(this.user.type));
    this.quizGameForm.controls.userId.setValue(String(this.user._id));

    console.log('this.quizGameForm.getRawValue(): ', this.quizGameForm.getRawValue());

    this.quizGameToCreate = this.quizGameForm.getRawValue() as QuizGameDmla;
    this.quizService.addQuizGame(this.quizGameToCreate);
  }

  quizSelected(): void {
    this.router.navigate(['/quiz-gameDmla/' + this.quizGameCreated._id]);
  }
}
