namespace backend.src.Services.SubTaskService;

using backend.src.DTOs.SubTask;
using backend.src.Models;
using backend.src.Services.BaseService;

public interface ISubTaskService : IBaseService<TaskList, SubTaskReadDTO, SubTaskCreateDTO, SubTaskUpdateDTO>
{
    Task<SubTaskReadDTO?> CreateSubTask(int taskParentId, SubTaskCreateDTO request);
    Task<SubTaskReadDTO?> UpdateSubTask(int taskParentId, int subTaskId, SubTaskUpdateDTO request);
}