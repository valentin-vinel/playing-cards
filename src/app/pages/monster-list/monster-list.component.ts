import { Component, computed, inject, model, signal } from '@angular/core';
import { MonsterService } from '../../services/monster/monster.service';
import { Monster } from '../../models/monster.model';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [SearchBarComponent, PlayingCardComponent],
  templateUrl: 'monster-list.component.html',
  styleUrl: 'monster-list.component.css'
})
export class MonsterListComponent {

  private monsterService = inject(MonsterService);
  private router = inject(Router)

  monsters = signal<Monster[]>([]);
  search = model('');

  filteredMonsters = computed(() => {
    return this.monsters().filter(monster => monster.name.includes(this.search()));
  })

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    const genericMonster = new Monster();
    this.monsterService.add(genericMonster);
    this.monsters.set(this.monsterService.getAll());
  }

  openMonster(monster: Monster) {
    this.router.navigate(['monster', monster.id])
  }

}
