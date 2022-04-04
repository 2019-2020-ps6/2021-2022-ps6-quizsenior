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

  public currentQuestion = 0;
  public answerSelected = false;
  public correctAnswers = 0;
  public incorrectAnswers = 0;
  public result = false;
  public randomize: number;
  public quiz: Quiz;


  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      console.log(this.quiz);
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.randomize = Math.floor(Math.random() * this.quiz.questions.length);
  }



  onAnswer(option: boolean): void {
    this.answerSelected = true;
    setTimeout(() => {
      this.currentQuestion++;
      this.randomize = Math.floor(Math.random() * this.quiz.questions.length);
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
  }
}
