import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoutlivre',
  templateUrl: './ajoutlivre.component.html',
  styleUrls: ['./ajoutlivre.component.css'],
})
export class AjoutlivreComponent implements OnInit {
  title = '';
  author = '';
  description = '';
  category: 'ROMAN' | 'NOUVELLE' | 'CHRONIQUE' | 'ESSAI' | 'AUTRE' = 'ROMAN';
  published = '';
  // selectedFile?: File;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  existingPhotoUrl: string | null = null;

  isEditing = false;
  editingBookId: number | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.bookService.getBooks().subscribe((books) => {
        const book = books.find((b) => b.id === id);
        if (book) {
          this.isEditing = true;
          //this.editingBookId = book.id;
          this.title = book.title;
          this.author = book.author;
          this.description = book.description;
          this.category = book.category;
          this.published = new Date(book.published).toISOString().split('T')[0];
          this.existingPhotoUrl = book.photoUrl
            ? `http://localhost:3000/uploads/${book.photoUrl}`
            : null;
        }
      });
    }
  }

  onSubmit() {
    const isoPublished = new Date(this.published).toISOString();
    const bookData: Book = {
      title: this.title,
      author: this.author,
      description: this.description,
      published: isoPublished,
      category: this.category,
    };

    if (this.isEditing && this.editingBookId !== null) {
      this.bookService
        .updateBook(
          this.editingBookId,
          bookData,
          this.selectedFile ?? undefined
        )
        .subscribe({
          next: () => {
            Swal.fire('Succès', 'Livre mis à jour avec succès !', 'success');
            this.resetForm();
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Erreur', 'Erreur lors de la mise à jour', 'error');
          },
        });
    } else {
      this.bookService
        .createBook(bookData, this.selectedFile ?? undefined)
        .subscribe({
          next: () => {
            Swal.fire('Succès', 'Livre créé avec succès !', 'success');
            this.resetForm();
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Erreur', 'Erreur lors de la création', 'error');
          },
        });
    }
  }

  startEdit(book: Book & { id: number }) {
    this.isEditing = true;
    this.editingBookId = book.id;
    this.title = book.title;
    this.author = book.author;
    this.description = book.description;
    this.category = book.category;
    this.published = new Date(book.published).toISOString().split('T')[0];
  }

  // onSubmit() {
  //   if (!this.title || !this.author || !this.category || !this.published) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Champs manquants',
  //       text: 'Veuillez remplir tous les champs obligatoires.',
  //     });
  //     return;
  //   }

  //   const isoPublished = new Date(this.published).toISOString();

  //   const bookData = {
  //     title: this.title,
  //     author: this.author,
  //     description: this.description,
  //     category: this.category,
  //     published: isoPublished,
  //   };

  //   this.bookService
  //     .createBook(bookData, this.selectedFile ?? undefined)
  //     .subscribe({
  //       next: () => {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Succès',
  //           text: 'Livre créé avec succès !',
  //           confirmButtonText: 'OK',
  //         }).then(() => {
  //           this.title = '';
  //           this.author = '';
  //           this.description = '';
  //           this.category = 'ROMAN';
  //           this.published = '';
  //           this.selectedFile = null;
  //         });
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Erreur',
  //           text: 'Une erreur est survenue lors de la création du livre.',
  //         });
  //       },
  //     });
  // }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm() {
    this.title = '';
    this.author = '';
    this.description = '';
    this.category = 'ROMAN';
    this.published = '';
    this.selectedFile = null;
  }
}
