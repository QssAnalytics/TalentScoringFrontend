export interface MonthNames {
  [key: number]: string;
}

export type RegisterFormDataType = FormDataType & {
  password2: string;
  age: number;
};

export type FormDataType = {
  username: string;
  password: string;
};

export interface IStage {
  id: number;
  child_count: number;
  stage_children: IStage[];
  stage_name: string;
  slug: string;
  parent: number | null;
}

export interface ISubStage {
  id: number;
  child_count: number;
  stage_children: any[];
  stage_name: string;
  slug: string;
  parent: number;
}

export interface IQuestion {
  id: number;
  questions: IQuestionQuestion[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stage_children: any[];
  stage_name: string;
  slug: string;
  parent: number;
}

export interface IQuestionQuestion {
  id: number;
  answers: IAnswer[];
  question_title: string;
}

export interface IAnswer {
  id: number;
  stage_fit: null | string;
  answer_title: string;
  answer_weight: null;
  answer_dependens_on: number | null;
}
