export enum TypeRepetition {
  Once = 'only_once',
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  MonthlyOn = 'monthly_on',
  Yearly = 'yearly',
}

export enum OnWeekend {
  Daily = 'daily',
  Friday = 'friday',
  Monday = 'monday',
}

export enum RepetitionEnd {
  Forever = 'forever',
}

export interface Repetition {
  firstDate: string;
  type: TypeRepetition;
  skip: number;
  weekend: OnWeekend;
  end: RepetitionEnd;
}
