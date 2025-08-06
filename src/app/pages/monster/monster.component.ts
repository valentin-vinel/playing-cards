import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  monsterId = signal<number | undefined>(undefined);
  routeSubsciption: Subscription | null = null;

  ngOnInit(): void {
    this.routeSubsciption = this.route.params.subscribe(params => {
      this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);
    })
  }

  ngOnDestroy(): void {
    this.routeSubsciption?.unsubscribe();
  }

  next() {
    let nextId = this.monsterId() || 0;
    nextId++;
    this.router.navigate(['/monster/' + nextId])
  }

}
