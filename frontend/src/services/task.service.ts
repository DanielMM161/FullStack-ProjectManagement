import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/constants';
import { CreateTaskRequest } from './request/task.request';

const createTask = createAsyncThunk('createTask', async (request: CreateTaskRequest) => {
    const token = JSON.parse(localStorage.getItem('token') ?? '');    
    const response = await instance.post('tasks', request, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    });

    if (response.status === 200) {
        return response.data;
    }
    
    return null;
});

const getTaskById = createAsyncThunk('getTaskById', async (id: number) => {
    const token = JSON.parse(localStorage.getItem('token') ?? '');    
    const response = await instance.post(`tasks/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    });

    if (response.status === 200) {
    return response.data;
    }
    return null;
});

export { createTask, getTaskById }