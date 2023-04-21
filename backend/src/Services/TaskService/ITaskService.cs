namespace backend.src.Services.TaskService;

using backend.src.DTOs.Comment;
using backend.src.DTOs.Task;
using backend.src.Models;
using backend.src.Services.BaseService;

public interface ITaskService : IBaseService<TaskList, TaskReadDTO, TaskCreateDTO, TaskUpdateDTO>
{
    Task<bool> AssignUserTaskAsync(int taskId, int userAssignedID);
    Task<bool> RemoveUserTaskAsync(int taskId, int userAssignedID);
    Task<bool> AddComment(int id, CommentCreateDTO request);
}