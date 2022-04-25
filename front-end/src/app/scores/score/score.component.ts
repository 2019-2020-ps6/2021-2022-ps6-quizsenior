import { Component, OnInit} from '@angular/core';
import {QuizGame} from '../../../models/quizgame.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {retry} from "rxjs/operators";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  public game: QuizGame;
  public quiz: Quiz;
  public answers: string[];
  public display = false;


  constructor(public quizService: QuizService, public route: ActivatedRoute) {
    this.quizService.game$.subscribe((game: QuizGame) => this.game = game);
    this.quizService.quizSelected$.subscribe((quiz: Quiz) => this.quiz = quiz);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedGame(id);
    this.quizService.setSelectedQuiz(this.game.quiz);
    this.buildQuestions();
  }

  totalNumberOfQuestions(): number{
    return parseInt(this.game.incorrectAnswers, 10) + parseInt(this.game.correctAnswers, 10);
  }

  buildQuestions(): void{
    this.answers = this.game.answers.split(':');
    this.answers.shift();
    this.answers.pop();
  }

  buildQuestion(question: string): string []{
    return question.split(',');
  }

  displayAnswers(): void{
    this.display = !this.display;
  }

  buildDate(): string{
    const date = new Date(this.game.id);
    return date.toLocaleString().split(',')[0];
  }

  buildTime(): string{
    const date = new Date(this.game.id);
    return date.toLocaleString().split(',')[1];
  }
}
