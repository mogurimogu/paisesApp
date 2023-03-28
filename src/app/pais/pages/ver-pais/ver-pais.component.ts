import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ codigoPais }) =>
          this.paisService.buscarCodigoPais(codigoPais)
        ),
        tap(console.log)
      )
      .subscribe({
        next: (pais) => {
          this.pais = pais[0];
        },
        error: (err) => {
          console.error('No se pudo encontrar ese país');
        },
      });

    // this.activatedRoute.params.subscribe(({ codigoPais }) => {
    //   console.log(codigoPais);
    //   this.paisService.buscarCodigoPais(codigoPais).subscribe({
    //     next: (pais) => console.log(pais),
    //     error: (err) => console.error(err),
    //   });
    // });
  }
}
