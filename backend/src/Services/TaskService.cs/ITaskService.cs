namespace backend.src.Services.TaskService.cs;

using backend.src.DTOs.SubTask;
using backend.src.DTOs.Task;
using backend.src.Models;
using backend.src.Services.BaseService;

public interface ITaskService : IBaseService<TaskList, TaskReadDTO, TaskCreateDTO, TaskUpdateDTO>
{
    Task<bool> AssignUserTaskAsync(int taskId, int userAssignedID);
    Task<bool> RemoveUserTaskAsync(int taskId, int userAssignedID);
    // Task<SubTaskReadDTO?> CreateSubTask(int taskParentId, SubTaskCreateDTO request);
    // Task<SubTaskReadDTO?> UpdateSubTask(int taskParentId, int subTaskId, SubTaskUpdateDTO request);

}