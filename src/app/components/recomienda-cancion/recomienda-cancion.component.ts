import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recomienda-cancion',
  templateUrl: './recomienda-cancion.component.html',
  styleUrls: ['./recomienda-cancion.component.scss']
})
export class RecomiendaCancionComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;
  canciones: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
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
  verResultados() {}
}
