import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-recomienda-cancion',
  templateUrl: './recomienda-cancion.component.html',
  styleUrls: ['./recomienda-cancion.component.scss']
})
export class RecomiendaCancionComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;
  canciones: FormGroup;
  show_results: Boolean;

  public doughnutChartLabels = [
    'Avicii - The nights',
    'Manzanita - Un ramito de violetas',
    'Chiquetete - Esa cobardía',
    'Camilo Sesto - Vivir así es morir de amor',
    'Jarabe de Palo - Eso que tú me das',
    'Junco - Hola mi amor'
  ];
  public doughnutChartData = [
    [350, 450, 100, 65, 97, 465]
  ];
  public doughnutChartType: ChartType = 'pie';

  constructor(private _formBuilder: FormBuilder, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.show_results = false;

    this.canciones = this._formBuilder.group({
      cancion: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    // Automatically expand the video to fit the page up to 1200px x 720px
    this.videoWidth = Math.min(this.demoYouTubePlayer.nativeElement.clientWidth, 1200);
    this.videoHeight = this.videoWidth * 0.6;
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  guardarCancion () {
    Swal.fire(
      '¡Gracias!',
      'Hemos registrado tu respuesta y ya estamos un poco más cerca de saber qué canción pondremos',
      'success'
    )
  }

  verResultados() {
    this.show_results = ! this.show_results;
  }
}
