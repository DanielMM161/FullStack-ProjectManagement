namespace backend.Services.Interfaces;

using backend.Models;
using backend.DTOs.Request;

public interface ITaskService
{
    Task<TaskList?> CreateAsync(TaskRequest request, List list, User createdBy);
    Task<TaskList?> UpdateAsync(int taskId, TaskUpdateRequest request);
    Task<List?> CheckListAsync(int listId);
    Task<User?> CheckCreatedByAsync(int userId);
}