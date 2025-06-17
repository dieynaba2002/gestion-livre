export interface Book {
  id?: number;
  title: string;
  author: string;
  description: string;
  published: string;
  category: 'ROMAN' | 'NOUVELLE' | 'CHRONIQUE' | 'ESSAI' | 'AUTRE';
  photoUrl?: string;
}
