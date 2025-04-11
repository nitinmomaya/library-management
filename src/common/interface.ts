export interface FormFieldInterface {
  name: string;
  label: string;
  type: 'text' | 'checkbox';
}

export interface TableHeadersInterface {
  label: string,
  key: string
}

export interface BorrowedBook {
  id: string,
      bookid: string,
      userid: string | undefined,
      borrowed_date: Date,
      return_date: Date,
      actual_return_date: Date | null,
      overdue_amount: number
}