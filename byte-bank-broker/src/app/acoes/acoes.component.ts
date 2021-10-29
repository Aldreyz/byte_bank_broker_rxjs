import { AcoesService } from './acoes.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(
    tap(() => {
      console.log('fluxo inicial');
    })
  );
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    tap(() => {
      console.log('fluxo do filtro');
    }),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );
  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);

  constructor(private acoesService: AcoesService) {}
}
