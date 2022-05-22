import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuizServiceDmla} from '../../../services/quizDmla.service';
import {QuizDmla} from '../../../models/quizDmla.model';

@Component({
  selector: 'app-quiz-listdmla2',
  templateUrl: './quiz-listDmla2.component.html',
  styleUrls: ['./quiz-listDmla2.component.scss']
})
export class QuizListDmla2Component implements OnInit {

  public quizList: QuizDmla[] = [];

  constructor(private router: Router, public quizService: QuizServiceDmla) {
    this.quizService.quizzes$.subscribe((quizzes: QuizDmla[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
    this.quizService.setQuizzesFromUrl();
  }

  quizSelected(selected: QuizDmla): void {
    this.router.navigate(['/quiz-gameDmla/' + selected._id]);
  }

  editQuiz(quiz: QuizDmla): void {
    this.router.navigate(['/edit-quizDmla/' + quiz.name]);
  }

  deleteQuiz(quiz: QuizDmla): void {
    this.quizService.deleteQuiz(quiz);
  }
}
