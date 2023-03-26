export enum FORMS {
  none,
  create,
  update,
  delete,
  detail,
}

export interface ModalState {
  show: boolean;
  title: string;
  message: string;
  form: FORMS;
}

export interface ModalInitialState {
  modal: ModalState;
}

export const initialModalState: ModalInitialState = {
  modal: {
    show: false,
    title: '',
    message: '',
    form: FORMS.none,
  },
};
