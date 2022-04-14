import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-menu-questionnaire',
  templateUrl: './menu-questionnaire.component.html',
  styleUrls: ['./menu-questionnaire.component.scss']
})
export class MenuQuestionnaireComponent implements OnInit {

  public themeList: string[] = [];

  public themeSelected: string;

  constructor(public themeService: ThemeService) {
    this.themeService.listTheme$.subscribe((themeList: string[]) => {
      this.themeList = themeList;
    });

    this.themeService.themeSelected$.subscribe((themeSelected: string) => {
      this.themeSelected = themeSelected;
    });
  }

  ngOnInit(): void {
  }

  theme(): void{
    console.log('HTML: ', this.themeList);
  }
}
