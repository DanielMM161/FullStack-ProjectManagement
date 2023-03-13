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

    public async Task<bool> AssignUserTaskAsync(int taskId, User assignedUser)
    {
        var task = await GetTaskWithUsers(taskId);
        if (task is null)
        {
            return false;
        }

        task.Users.Add(assignedUser);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoveUserTaskAsync(int taskId, User assignedUser)
    {
        var task = await GetTaskWithUsers(taskId);
        if (task is null)
        {
            return false;
        }

        task.Users.Remove(assignedUser);
        await _dbContext.SaveChangesAsync();
        return true;
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

    public async Task<User?> CheckUserBelongProject(int userId, int projectId)
    {        
        var project = await _dbContext.Projects
            .Include(p => p.Users)
            .SingleOrDefaultAsync(p => p.Id == projectId);
        if (project is null)
        {
            return null;
        }

        var usersId = project.Users.Select(u => u.Id).ToList();
        var index = usersId.IndexOf(userId);
        if (index == -1)
        {
            return null;
        }
        
        return project.Users.ToArray()[index];
    }

    private async Task<TaskList?> GetAsync(int id)
    {        
        return await _dbContext.Set<TaskList>().FindAsync(id);
    }

    private async Task<TaskList?> GetTaskWithUsers(int taskId)
    {
        var task = await _dbContext.Tasks
            .Include(t => t.Users)
            .SingleOrDefaultAsync(t => t.Id == taskId);
        if (task is null)
        {
            return null;
        }
        return task;
    }
}