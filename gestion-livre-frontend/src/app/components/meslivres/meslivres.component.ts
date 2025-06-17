import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meslivres',
  templateUrl: './meslivres.component.html',
  styleUrls: ['./meslivres.component.css'],
})
export class MeslivresComponent implements OnInit {
  books: Book[] = [];
  constructor(private bookService: BookService, private router: Router) {}
  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.books = res;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des livres :', err);
      },
    });
  }

  getCategoryClass(category: string): string {
    return category.toLowerCase();
  }

  getYear(published: string): string {
    return new Date(published).getFullYear().toString();
  }

  getPhotoUrl(photoUrl: string | undefined): string {
    return photoUrl
      ? `http://localhost:3000/uploads/${photoUrl}`
      : 'https://via.placeholder.com/300x400?text=Livre';
  }

  editBook(id: number) {
    this.router.navigate(['/ajout-livre', id]);
  }
  deleteBook(id: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer ce livre ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.deleteBook(id).subscribe({
          next: () => {
            Swal.fire('Supprimé !', 'Le livre a été supprimé.', 'success');
            this.getBooks();
          },
          error: () => {
            Swal.fire('Erreur', 'Impossible de supprimer le livre.', 'error');
          },
        });
      }
    });
  }
}
