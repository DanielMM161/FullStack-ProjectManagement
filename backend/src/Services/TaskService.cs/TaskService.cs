namespace backend.src.Services.TaskService.cs;

using AutoMapper;
using backend.src.DTOs.SubTask;
using backend.src.DTOs.Task;
using backend.src.Models;
using backend.src.Repositories.TaskRepo;
using backend.src.Repositories.UserRepo;
using backend.src.Services.BaseService;

public class TaskService : BaseService<TaskList, TaskReadDTO, TaskCreateDTO, TaskUpdateDTO>, ITaskService
{
    private readonly ITaskRepo _repo;
    private readonly IUserRepo _userRepo;
    public TaskService(IMapper mapper, ITaskRepo repo, IUserRepo userRepo) : base(mapper, repo)
    {
        _repo = repo;
        _userRepo = userRepo;
    }

    public async Task<bool> AssignUserTaskAsync(int taskId, int userAssignedID)
    {
        var task = await _repo.GetByIdAsync(taskId);
        if (task is null)
        {
            return false;
        }

        var user = await _userRepo.GetById(userAssignedID);
        if (user is null)
        {
            return false;
        }

        task.Users.Add(user);
        await _repo.UpdateOneAsync(taskId, task);
        return true;
    }

    public async Task<bool> RemoveUserTaskAsync(int taskId, int userAssignedID)
    {
        var task = await _repo.GetByIdAsync(taskId);
        if (task is null)
        {
            return false;
        }

        var user = await _userRepo.GetById(userAssignedID);
        if (user is null)
        {
            return false;
        }

        task.Users.Remove(user);
        await _repo.UpdateOneAsync(taskId, task);
        return true;
    }

    // public async Task<SubTaskReadDTO?> CreateSubTask(int taskParentId, SubTaskCreateDTO request)
    // {
    //     var parentTask = await _repo.GetByIdAsync(taskParentId);    
    //     if (parentTask is null || parentTask.ParentId is not null)
    //     {
    //         return null;
    //     }

    //     var subTask = new TaskList()
    //     {
    //         Title = request.Title,
    //         Parent = parentTask,
    //         ListId = parentTask.ListId,       
    //         Done = false,
    //         DueDate = parentTask.DueDate,            
    //         CreatedById = request.CreatedById,
    //         Users = parentTask.Users            
    //     };

    //     var createdSubTask= await _repo.CreateOneAsync(subTask);
    //     if (createdSubTask is null)
    //     {
    //         return null;
    //     }
        
    //     return _mapper.Map<TaskList, SubTaskReadDTO>(createdSubTask);
    // }

    // public async Task<SubTaskReadDTO?> UpdateSubTask(int taskParentId, int subTaskId, SubTaskUpdateDTO request)
    // {
    //     var subTask = await _repo.GetByIdAsync(subTaskId);
    //     if (subTask is null || subTask.ParentId != taskParentId)
    //     {
    //         return null;
    //     }

    //     if (request.Title is not null && request.Title.Trim() != "")
    //     {
    //         subTask.Title = request.Title;
    //     }

    //     if (request.Done is not null)
    //     {
    //         subTask.Done = request.Done;
    //     }

    //     var item = _mapper.Map<>
    // }
}