import { inject, Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { HttpClient } from '@angular/common/http';
import { IMonster } from '../../interfaces/monster.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  private http = inject(HttpClient);
  private BASE_URL = 'https://pokebuildapi.fr/api/v1/pokemon/limit/30'

  getAll(): Observable<Monster[]> {
    return this.http.get<IMonster[]>(this.BASE_URL).pipe(
      map(monsterDictArray => {
        return monsterDictArray.map<Monster>(
          monsterDict => Monster.fromJson(monsterDict)
        )
      })
    )
  }

  	get(id: number): Observable<Monster> {
		return this.http.get<IMonster>(this.BASE_URL + id + '/').pipe(
			map(monsterJson => Monster.fromJson(monsterJson))
		);
	}

	add(monster: Monster): Observable<Monster> {
		return this.http.post<IMonster>(this.BASE_URL, monster.toJson()).pipe(
			map(monsterJson => Monster.fromJson(monsterJson))
		);
	}

	update(monster: Monster): Observable<Monster> {
		return this.http.put<IMonster>(this.BASE_URL + monster.id + '/', monster.toJson()).pipe(
			map(monsterJson => Monster.fromJson(monsterJson))
		);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(this.BASE_URL + id + '/');
	}

}
