namespace backend.Services.Interfaces;

using backend.Models;
using backend.DTOs.Request.Tasks;

public interface ITaskService
{
    Task<TaskList?> CreateAsync(TaskRequest request, List list, User createdBy);
    Task<TaskList?> UpdateAsync(int taskId, TaskUpdateRequest request);
    Task<bool> AssignUserTaskAsync(int taskId, User assignedUser);
    Task<bool> RemoveUserTaskAsync(int taskId, User removeUser);
    Task<TaskList?> CreateSubTask(int taskParentId, SubTaskRequest request);
    Task<bool> RemoveSubTask(int taskParentId, int subtaskId);
    Task<TaskList> PatchSubTask(int taskParentId, int subtaskId, PatchSubTaskRequest request);
    Task<User?> CheckUserBelongProject(int userId, int projectId);
    Task<List?> CheckListAsync(int listId);
    Task<User?> CheckCreatedByAsync(int userId);
}