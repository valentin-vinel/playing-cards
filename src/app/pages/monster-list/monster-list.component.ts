import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Monster } from '../../models/monster.model';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { MonsterService } from '../../services/monster/monster.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-monster-list',
	standalone: true,
	imports: [CommonModule, PlayingCardComponent, SearchBarComponent, MatButtonModule],
	templateUrl: './monster-list.component.html',
	styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {

	private monsterService = inject(MonsterService);
	private router = inject(Router);

	monsters = toSignal(this.monsterService.getAll());
	search = model('');

	filteredMonsters = computed(() => {
		return this.monsters()?.filter(monster => monster.name.includes(this.search())) ?? [];
	});

	addMonster() {
		this.router.navigate(['monster']);
	}

	openMonster(monster: Monster) {
		this.router.navigate(['monster', monster.id]);
	}

}