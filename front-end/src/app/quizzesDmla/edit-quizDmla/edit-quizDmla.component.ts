import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizDmla } from 'src/models/quizDmla.model';
import { QuizServiceDmla } from 'src/services/quizDmla.service';

@Component({

  selector: 'app-edit-quizdmla',
  templateUrl: './edit-quizDmla.component.html',
  styleUrls: ['./edit-quizDmla.component.scss']
})
export class EditQuizDmlaComponent implements OnInit {

  public quiz: QuizDmla;

  constructor(private route: ActivatedRoute, private quizService: QuizServiceDmla) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

}
