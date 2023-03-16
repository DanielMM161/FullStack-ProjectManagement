namespace backend.src.Services.SubTaskService;

using AutoMapper;
using backend.src.DTOs.SubTask;
using backend.src.Models;
using backend.src.Repositories.BaseRepo;
using backend.src.Repositories.SubTaskRepo;
using backend.src.Services.BaseService;

public class SubTaskService : BaseService<TaskList, SubTaskReadDTO, SubTaskCreateDTO, SubTaskUpdateDTO>, ISubTaskService
{
    private readonly ISubTaskRepo _repo;
    public SubTaskService(IMapper mapper, ISubTaskRepo repo) : base(mapper, repo)
    {
        _repo = repo;
    }

    public async Task<SubTaskReadDTO?> CreateSubTask(int taskParentId, SubTaskCreateDTO request)
    {
        var parentTask = await _repo.GetByIdAsync(taskParentId);    
        if (parentTask is null || parentTask.ParentId is not null)
        {
            return null;
        }

        var subTask = new TaskList()
        {
            Title = request.Title,
            Parent = parentTask,
            ListId = parentTask.ListId,       
            Done = false,
            DueDate = parentTask.DueDate,            
            CreatedById = request.CreatedById,
            Users = parentTask.Users            
        };

        var createdSubTask= await _repo.CreateOneAsync(subTask);
        if (createdSubTask is null)
        {
            return null;
        }
        
        return _mapper.Map<TaskList, SubTaskReadDTO>(createdSubTask);
    }
}