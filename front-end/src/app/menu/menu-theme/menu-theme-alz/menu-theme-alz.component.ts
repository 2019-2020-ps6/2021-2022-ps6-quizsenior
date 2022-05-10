import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../../services/theme.service';

@Component({
  selector: 'app-menu-theme-menu-theme-alz',
  templateUrl: './menu-theme-alz.component.html',
  styleUrls: ['./menu-theme-alz.component.scss']
})

export class MenuThemeAlzComponent implements OnInit {

  public themeList: string[] = [];

  public themeSelected: string = null;

  constructor(public themeService: ThemeService) {
    this.themeService.listThemeAlz$.subscribe((themeList: string[]) => {
      this.themeList = themeList;
    });
  }

  ngOnInit(): void {
    this.themeService.setQuizzesALzFromUrl();
  }

  selectTheme(theme: string): void {
    this.themeService.setThemeAlz(theme);
  }

}
