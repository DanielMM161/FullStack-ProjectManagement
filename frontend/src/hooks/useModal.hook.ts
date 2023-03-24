import { useState } from 'react';

export enum FORMS {
  none,
  create,
  update,
  delete,
  detail,
  assign,
}

interface IStateForms {
  title: string;
  form: FORMS;
}

function useDialog() {
  const [showDialog, setShowDialog] = useState(false);
  const [typeForm, setTypeForm] = useState<IStateForms>({
    title: '',
    form: FORMS.none,
  });

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  return { typeForm, setTypeForm, toggleDialog, showDialog };
}

export default useDialog;
