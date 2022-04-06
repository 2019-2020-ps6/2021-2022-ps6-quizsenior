import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizServiceDmla } from '../../../services/quizDmla.service';
import { QuizDmla } from '../../../models/quizDmla.model';

@Component({
  selector: 'app-quiz-listdmla',
  templateUrl: './quiz-listDmla.component.html',
  styleUrls: ['./quiz-listDmla.component.scss']
})
export class QuizListDmlaComponent implements OnInit {

  public quizList: QuizDmla[] = [];

  constructor(private router: Router, public quizService: QuizServiceDmla) {
    this.quizService.quizzes$.subscribe((quizzes: QuizDmla[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
  }

  quizSelected(selected: QuizDmla): void {
    this.router.navigate(['/quiz-gameDmla/' + selected.id]);
  }

  editQuiz(quiz: QuizDmla): void {
    this.router.navigate(['/edit-quizDmla/' + quiz.name]);
  }

  deleteQuiz(quiz: QuizDmla): void {
    this.quizService.deleteQuiz(quiz);
  }
}
