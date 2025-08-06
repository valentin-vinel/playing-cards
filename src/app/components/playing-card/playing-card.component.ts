import { Component, input, Input, InputSignal, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  standalone: true,
  imports: [],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css'
})
export class PlayingCardComponent implements OnChanges {

  monster = input(new Monster());
  monsterTypeIcon
  : string = "https://static.wikia.nocookie.net/pokemongo/images/2/2f/Electric.png";
  backgroundColor: string = "rgb(255,255,104)";

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['monster']) {
      if(changes['monster'].previousValue?.type != changes['monster'].currentValue.type) {
        this.monsterTypeIcon = MonsterTypeProperties[this.monster().type].imageUrl;
        this.backgroundColor = MonsterTypeProperties[this.monster().type].color;
      }
    }
  }

};

