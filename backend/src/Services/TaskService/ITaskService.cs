namespace backend.src.Services.TaskService;

using backend.src.DTOs.Comment;
using backend.src.DTOs.Task;
using backend.src.Models;
using backend.src.Services.BaseService;

public interface ITaskService : IBaseService<TaskList, TaskReadDTO, TaskCreateDTO, TaskUpdateDTO>
{
    Task<bool> AssignUserTaskAsync(int taskId, int userAssignedID);
    Task<bool> RemoveUserTaskAsync(int taskId, int userAssignedID);
    Task<CommentReadDTO> AddComment(CommentCreateDTO request);
    Task<bool> UpdateComment(int commentId, CommentUpdateDTO request);
    Task<bool> DeleteComment(int commentId);
}