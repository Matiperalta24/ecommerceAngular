import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ContactService } from './contact.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  route: ActivatedRoute = inject(ActivatedRoute); 
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')
      ]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get firstName() {
    return this.contactForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.contactForm.get('lastName') as FormControl;
  }

  get email() {
    return this.contactForm.get('email') as FormControl;
  }

  get message() {
    return this.contactForm.get('message') as FormControl;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.sendMessage(this.contactForm.value).subscribe(
        response => {
          console.log('Mensaje enviado exitosamente', response);
          alert('¡Mensaje enviado con éxito!');
          this.contactForm.reset();
        },
        error => {
          console.error('Error enviando el mensaje', error);
          alert('Error enviando el mensaje');
        }
      );
    }
  }
}


