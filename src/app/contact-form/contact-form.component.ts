import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ContactService } from './contact.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
      <section class="listing-apply">
        <h2 class="section-heading">Para más información dejanos tu mensaje</h2>
        <form [formGroup]="applyForm" (submit)="handleSubmit()">
          <label for="first-name">Nombre</label>
          <input type="text" placeholder="Ingrese su nombre" id="fist-name" formControlName="firstName" />
          <span class="alert" [hidden]="firstName.valid || firstName.untouched"
            >Debe completar su nombre</span
          >
          <label for="last-name">Apellido</label>
          <input type="text" placeholder="Ingrese su apellido" id="last-name" formControlName="lastName" />
          <span class="alert" [hidden]="lastName.valid || lastName.untouched"
            >Debe completar su apellidoo</span
          >
          <label for="email">Correo electrónico</label>
          <input type="text" placeholder="Ingrese su correo" id="email" formControlName="email" />
          <span class="alert" [hidden]="email.valid || email.untouched">
            @if(email.errors?.['required']){Email is required} @else{Must be a
            valid email}
          </span>
          <label for="message">Mensaje</label>
          <textarea id="message" formControlName="message" rows="5"></textarea>
          <button type="submit" class="primary" [disabled]="applyForm.invalid">
          Enviar
          </button>
        </form>
      </section>

  `,
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  route: ActivatedRoute = inject(ActivatedRoute); 
  contactForm: FormGroup;
  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl ('', Validators.required),
    email: new FormControl('', [
      Validators.required, 
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')
    ])
  })
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.sendMessage(this.contactForm.value).subscribe(
        response => {
          console.log('Email sent successfully', response);
          alert('Email sent successfully');
          this.contactForm.reset();
        },
        error => {
          console.error('Error sending email', error);
          alert('Error sending email');
        }
      );
    }
  }
  get firstName() {
    return this.applyForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.applyForm.get('lastName') as FormControl;
  }
  get email() {
    return this.applyForm.get('email') as FormControl;
  }

  handleSubmit() {
    if (this.applyForm.invalid) return;
    this.contactForm.getError(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
    );
  }

}

