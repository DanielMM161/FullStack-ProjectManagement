import { createAsyncThunk } from '@reduxjs/toolkit';
import { Loading } from '../models/loading';
import instance from '../utils/constants';
import { CreateListRequest, UpdateListRequest } from './request/list';
import { showLoading } from '../redux/slice/actions';

const createList = createAsyncThunk('createList', async (request: CreateListRequest, thunkApi) => {
  thunkApi.dispatch(
    showLoading({
      title: 'Creating List',
      show: true,
    } as Loading),
  );
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  try {
    const response = await instance.post('lists', request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
});

const getListsByProject = createAsyncThunk('getListsByProject', async (projectId: number) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.get(`lists/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  }
  return null;
});

const updateList = createAsyncThunk('updateList', async (request: UpdateListRequest) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.put(`lists/${request.id}`, { 
    title: request.title
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

  if (response.status === 200) {
    return response.data;
  }
  return null;
});

const deleteList = createAsyncThunk('deleteList', async (id: number, thunkApi) => {
  thunkApi.dispatch(
    showLoading({
      title: 'Deleting List',
      show: true,
    } as Loading),
  );
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.delete(`lists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  }

  return false;
});

export { createList, getListsByProject, deleteList, updateList };
