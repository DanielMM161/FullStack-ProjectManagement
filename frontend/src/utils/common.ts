import { NOTIFICATION_TYPE, Store } from 'react-notifications-component';
import { Loading } from '../models/loading';
import { showLoading } from '../redux/slice/ActionsSlice';

export function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'long' });
    return `${date.getDay()} ${month}, ${date.getFullYear()}`;
  } catch (error) {
    console.error('Error Format Date --> ', error);
    return '';
  }
}

export function CompareDates(dateString: string) {  
  const date = new Date(dateString);
  
  const currentDate = new Date();

  return currentDate > date
}

export function isInstanceOf<T>(object: any, parameter: string): object is T {
  try {
    return parameter in object    
  } catch (error) {
    return false
  }
}

export function showNotification(title: string, message: string, type: NOTIFICATION_TYPE) {
  Store.addNotification({
    title,
    message,
    type,
    insert: 'bottom',
    container: 'bottom-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}

export function handleThunkApi(thunkAPI: any, message: string) {
  thunkAPI.dispatch(
    showLoading({
      title: message,
      show: true,
    } as Loading),
  );
}
