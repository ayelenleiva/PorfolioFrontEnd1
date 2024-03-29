import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { persona } from '../model/persona.model';
import { PersonaService } from '../services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.css']
})
export class ModalRegistroComponent implements OnInit {
  form:FormGroup;
  perso:persona;
  constructor(private formBuilder: FormBuilder,
              private sPersona:PersonaService,
              private activatedRoute:ActivatedRoute,
              private router:Router
    ) {
    //Creamos el grupo de controles para el formulario 
    this.form=this.formBuilder.group({
      id:[''],
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      img:['',[Validators.required]],
      banner:['',[Validators.required]],
      sobreMi:['',[Validators.required]],
      titulo:['',[Validators.required]],
   })
   }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sPersona.detail(id).subscribe(data => {
      this.perso=data;
    },err =>{
      alert("Error al cargar datos");
      this.router.navigate(['']);
    }
    )
  }

  get Nombre(){
    return this.form.get("nombre");
  }

  get Apellido(){
    return this.form.get("apellido");
  }

  get Titulo(){
    return this.form.get("titulo");
  }
  get Img(){
    return this.form.get("img");
  }

  get Banner(){
    return this.form.get("banner");
  }

  get SobreMi(){
    return this.form.get("sobreMi");
  }

  onUpdate():void{
    this.sPersona.edit(this.form.value).subscribe(data => {
      alert("Persona modificada.");
      this.router.navigate(['']);
    }
    )
  }

  onEnviar(event:Event){
    event.preventDefault;
    if (this.form.valid){
      this.onUpdate();
    }else{
      alert("falló en la carga, intente nuevamente");
      this.form.markAllAsTouched();
    }
  }

}