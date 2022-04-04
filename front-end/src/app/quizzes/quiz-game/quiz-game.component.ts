import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})



export class QuizGameComponent implements OnInit {

  public currentQuestion;
  public answerSelected = false;
  public correctAnswers;
  public incorrectAnswers;
  public result = false;
  public quiz: Quiz;


  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      console.log(this.quiz);
      console.log(this.quiz.repetition);
      console.log(this.quiz.nbRepetition);
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
  }



  onAnswer(option: boolean): void {
    this.answerSelected = true;
    setTimeout(() => {
      this.currentQuestion++;
      this.answerSelected = false;
    }, 1000);

    if (option){
      this.correctAnswers++;
    }else{
      this.incorrectAnswers++;
    }
  }

  showResult(): void{
    this.result = true;

    // let quizGame = new QuizGameComponent()
  }
}
