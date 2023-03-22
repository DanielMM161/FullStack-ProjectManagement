namespace backend.src.Services.SubTaskService;

using AutoMapper;
using backend.src.DTOs.SubTask;
using backend.src.Models;
using backend.src.Repositories.SubTaskRepo;
using backend.src.Services.BaseService;
using backend.src.Helpers;
using backend.src.Repositories.ProjectRepo;

public class SubTaskService : BaseService<TaskList, SubTaskReadDTO, SubTaskCreateDTO, SubTaskUpdateDTO>, ISubTaskService
{
    private readonly ISubTaskRepo _repo;
    private readonly IProjectRepo _projectRepo;
    private readonly IClaimsPrincipalService _claimsService;
    public SubTaskService(IMapper mapper, 
                            ISubTaskRepo repo,
                            IProjectRepo projectRepo,
                            IClaimsPrincipalService claimsService) : base(mapper, repo)
    {
        _repo = repo;
        _projectRepo = projectRepo;
        _claimsService = claimsService;
    }

    public async Task<SubTaskReadDTO?> CreateSubTask(int taskParentId, SubTaskCreateDTO request)
    {
        var parentTask = await _repo.GetByIdAsync(taskParentId);    
        if (parentTask is null)
        {
           throw ServiceException.NotFound("Parent id is not found");
        }

        if (parentTask.ParentId is not null)
        {
            throw ServiceException.Forbidden("The Parent id it can not be a subtask");
        }

        var project = await _claimsService.IsProjectExist(parentTask.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        var subTask = _mapper.Map<SubTaskCreateDTO, TaskList>(request);
        subTask.ParentId = parentTask.Id;
        subTask.ListId = parentTask.ListId;
        subTask.Done = false;
        subTask.CreatedById = request.CreatedById;
        subTask.Users = parentTask.Users;
        subTask.ProjectId = parentTask.List.ProjectId;

        var createdSubTask = await _repo.CreateOneAsync(subTask);
        if (createdSubTask is null)
        {
            throw new Exception("Cannot create");
        }
        
        return _mapper.Map<TaskList, SubTaskReadDTO>(createdSubTask);
    }

    public async Task<SubTaskReadDTO?> UpdateSubTask(int taskParentId, int subTaskId, SubTaskUpdateDTO request)
    {
        var subTask = await _repo.GetByIdAsync(subTaskId);
        if (subTask is null)
        {
           throw ServiceException.NotFound();
        }

        if (subTask.ParentId != taskParentId)
        {
            throw ServiceException.Forbidden("The Parent Id Is not the parent about SubTask Id");
        }

        var project = await _claimsService.IsProjectExist(subTask.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        var subTaskUpdate = subTask;
        if (request.Title is not null && request.Title.Trim() != "")
        {
            subTask.Title = request.Title;
        }

        if (request.Done is not null)
        {
            subTask.Done = request.Done;
        }
                
        return _mapper.Map<TaskList, SubTaskReadDTO>(await _repo.UpdateOneAsync(subTask));
    }
}