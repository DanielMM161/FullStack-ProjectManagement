namespace backend.Services.Impl;

using backend.Db;
using backend.DTOs.Request;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class DbTaskService : ITaskService
{
    private readonly AppDbContext _dbContext;

    public DbTaskService(AppDbContext dbContext) => _dbContext = dbContext;

    public async Task<TaskList?> CreateAsync(TaskRequest request, List list, User createdBy)
    {
        var taskList = new TaskList();
        request.UpdateModel(taskList);
        taskList.CreatedBy = createdBy;
        taskList.List = list;
        _dbContext.Add(taskList);
        await _dbContext.SaveChangesAsync();
        return taskList;
    }

    public async Task<TaskList?> UpdateAsync(int taskId, TaskUpdateRequest request)
    {
        var task = await GetAsync(taskId);
        if (task is null)
        {
            return null;
        }
        request.UpdateModel(task);
        _dbContext.Update(task);
        await _dbContext.SaveChangesAsync();
        return task;
    }


    public async Task<User?> CheckCreatedByAsync(int userId)
    {
        return await _dbContext.Users
            .SingleOrDefaultAsync(u => u.Id == userId);
    }

    public async Task<List?> CheckListAsync(int listId)
    {
        return await _dbContext.Lists
            .SingleOrDefaultAsync(l => l.Id == listId);
    }

    private async Task<TaskList?> GetAsync(int id)
    {
        return await _dbContext.Set<TaskList>().FindAsync(id);
    }
}