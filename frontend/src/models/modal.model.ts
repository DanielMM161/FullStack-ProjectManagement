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

export interface modalInitialState {
  modal: ModalState;
}

export const initialModalState: modalInitialState = {
  modal: {
    show: false,
    title: '',
    message: '',
    form: FORMS.none,
  },
};
