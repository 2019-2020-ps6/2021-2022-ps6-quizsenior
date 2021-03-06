import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {QuestionDmla} from '../../models/questionDmla.model';
import {ReloadService} from '../../services/reload.service';


@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.component.html',
  styleUrls: ['./tuto.component.scss']
})
export class TutoComponent implements OnInit {

  public count: number;
  public user: User = null;
  public synth;
  public sound: boolean;


  constructor(public realoadService: ReloadService) {
    this.synth = window.speechSynthesis;
    this.count = 0;
    this.sound = true;
    this.navigate();
  }

  ngOnInit(): void {
    console.log('Read question', 'read juste pour test');
    const utterThis = new SpeechSynthesisUtterance('bienvenue dans ce tutoriel pour vous apprendre à jouer. Pour passer à l\'étape suivant une fois les informations assimilées, appuyez sur "Entrer", pour réécouter la consigne appuyez sur "l\'espace" et enfin pour revenir en arrière, appuyez sur la barre "effacée".\n' +
      'Bon tutoriel ! ');
    utterThis.lang = 'fr-FR';
    this.synth.speak(utterThis);
    this.readJustepourtes();
  }

  upCount(): void {
    this.canceled();
    if (this.count < 5) {
      this.count++;
    } else {
      this.CanTGoAfter();
    }
  }

  downCount(): void {
    this.canceled();
    if (this.count > 0) {
      this.count--;
    } else {
      this.CanTGoBefore();
    }
  }

  canceled(): void {
    this.synth.cancel();
  }

  navigate(): void {
    console.log('fefef');
    document.addEventListener('keydown', (event) => {
      if (!event.repeat) {
        const nomTouche = event.key;
        if (nomTouche === 'Enter' || nomTouche === 'Backspace' || nomTouche === ' ') {
          this.synth.cancel();
          console.log('ded', event.key);
          if (nomTouche === 'Enter') {
            this.upCount();
            if (this.sound === true) {
              this.readTuto();
            }
          }
          if (nomTouche === 'Backspace') {
            this.downCount();
            if (this.sound === true) {
              this.readTuto();
            }
          }
          if (nomTouche === ' ') {
            if (this.sound === true) {
              this.readTuto();
            }
          }
        }
      }
    });
    this.readJustepourtes();
  }

  CanTGoAfter(): void {
    const utterThis = new SpeechSynthesisUtterance('Vous êtes arrivé à la fin du tutoriel, vous pouvez vous lancer !');
    utterThis.lang = 'fr-FR';
    this.synth.speak(utterThis);
  }

  CanTGoBefore(): void {
    const utterThis = new SpeechSynthesisUtterance('Vous êtes au début du tutoriel, vous pouvez avancer das le tutoriel !');
    utterThis.lang = 'fr-FR';
    this.synth.speak(utterThis);
  }

  readTuto(): void {
    switch (this.count) {

      case 0:
        const utterThisCount0 = new SpeechSynthesisUtterance('bienvenue dans ce tutoriel pour vous apprendre à jouer. Pour passer à l\'étape suivant une fois les informations assimilées, appuyez sur "Entrer", pour réécouter la consigne appuyez sur "l\'espace" et enfin pour revenir en arrière, appuyez sur la barre "effacée".\n' +
          'Bon tutoriel ! ');
        utterThisCount0.lang = 'fr-FR';
        this.synth.speak(utterThisCount0);
        break;

      case 1:
        const utterThisCount1 = new SpeechSynthesisUtterance('Choisissez votre thème, il réprésente une catégorie de question, par exemple:SPORT\n' +
          '\n' +
          'Ensuite, choisissez votre questionnaire, il correspond au sujet des questions, par exemple :Football');
        utterThisCount1.lang = 'fr-FR';
        this.synth.speak(utterThisCount1);
        break;

      case 2:
        const utterThisCount2 = new SpeechSynthesisUtterance('Comment naviguer pendant le quiz?\n' +
          'Il vous suffit de vous déplacer avec les touches directionnelles de votre clavier' + '\n' + 'Cest à dire, les fléches du bas, du haut ,de la droite et de la gauche');
        utterThisCount2.lang = 'fr-FR';
        this.synth.speak(utterThisCount2);
        break;

      case 3:
        const utterThisCount3 = new SpeechSynthesisUtterance('Comment lire la question ou lire les réponses?\n' +
          'Il vous suffit de soit vous déplacer avec les fléche directionelles, soit appuyer sur la touche espace de votre clavier');
        utterThisCount3.lang = 'fr-FR';
        this.synth.speak(utterThisCount3);
        break;

      case 4:
        const utterThisCount4 = new SpeechSynthesisUtterance(' Comment passer aux réponses une fois avoir bien compris la question et comme valider vos réponses?\n' +
          'Il vous suffit d\'appuyer sur la touche entrer de votre clavier');
        utterThisCount4.lang = 'fr-FR';
        this.synth.speak(utterThisCount4);
        break;

      case 5:
        const utterThisCount5 = new SpeechSynthesisUtterance('Félicitation, vous êtes fin prêts à vous lancer dans vos premier quiz.\n' +
          '\n' +
          'Bonne chance !');
        utterThisCount5.lang = 'fr-FR';
        this.synth.speak(utterThisCount5);
        break;
    }

  }

  readJustepourtes(): void {
    console.log('LE DOC', window.document.getElementsByTagName('keydown'));
  }

  soundOff(): void {
    this.sound = false;
    this.canceled();
  }

  soundOn(): void {
    this.sound = true;
    this.readTuto();
  }

  end(): void {
    this.canceled();
    this.realoadService.setReloadTrue();
  }


}
