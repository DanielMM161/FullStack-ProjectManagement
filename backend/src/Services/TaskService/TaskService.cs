namespace backend.src.Services.TaskService;

using AutoMapper;
using backend.src.DTOs.Task;
using backend.src.Helpers;
using backend.src.Models;
using backend.src.Repositories.ProjectRepo;
using backend.src.Repositories.TaskRepo;
using backend.src.Repositories.SubTaskRepo;
using backend.src.Repositories.UserRepo;
using backend.src.Repositories.ListRepo;
using backend.src.Services.BaseService;
using backend.src.DTOs.SubTask;
using backend.src.Repositories.CommentRepo;
using backend.src.DTOs.Comment;
using Microsoft.EntityFrameworkCore;

public class TaskService : BaseService<TaskList, TaskReadDTO, TaskCreateDTO, TaskUpdateDTO>, ITaskService
{
    private readonly ITaskRepo _repo;
    private readonly ICommentRepo _commentRepo;
    private readonly ISubTaskRepo _subTaskRepo;
    private readonly IUserRepo _userRepo;
    private readonly IProjectRepo _projectRepo;
    private readonly IListRepo _listRepo;
    private readonly IClaimsPrincipalService _claimsService;
    public TaskService(IMapper mapper, 
                        ITaskRepo repo, 
                        IUserRepo userRepo, 
                        IClaimsPrincipalService claimsService,
                        IProjectRepo projectRepo,
                        IListRepo listRepo,
                        ISubTaskRepo subTaskRepo,
                        ICommentRepo commentRepo) : base(mapper, repo)
    {
        _repo = repo;
        _userRepo = userRepo;
        _claimsService = claimsService;
        _projectRepo = projectRepo;
        _listRepo = listRepo;
        _subTaskRepo = subTaskRepo;
        _commentRepo = commentRepo;
        
    }

    public override async Task<TaskReadDTO> GetByIdAsync(int id)
    {
        var task = await _repo.GetByIdAsync(id);
        
        if (task is null)
        {
            throw ServiceException.NotFound();
        }

        var project = await _claimsService.IsProjectExist(task.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        var taskRead = _mapper.Map<TaskList, TaskReadDTO>(task);
        var subTasks = await _subTaskRepo.GetSubTaskByParent(id);
        taskRead.SubTasks = subTasks.Select(st => _mapper.Map<TaskList, SubTaskReadDTO>(st)).ToArray();

        var comments = await _commentRepo.GetCommentByTask(id);
        if (comments.Count != 0)
        {            
            var commentsRead = await Task.WhenAll(comments
                .Select(async c => {
                    var user = await _userRepo.GetById(c.UserId);
                    return new CommentReadDTO
                    {
                        Message = c.Message,
                        UserName = user is not null ? $"{user.FirstName} {user.LastName}" : ""
                    };
                })
            );
            taskRead.Comments = commentsRead;
        }        
        return taskRead;
    }

    public override async Task<TaskReadDTO> CreateOneAsync(TaskCreateDTO request)
    {        
        var list = await _listRepo.GetByIdAsync(request.ListId);        
        if (list is null)
        {               
            throw ServiceException.NotFound("List id is not found");
        }

        var project = await _claimsService.IsProjectExist(list.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        request.ProjectId = list.ProjectId;        
        request.CreatedById = _claimsService.GetUserId();

        return await base.CreateOneAsync(request);
    }


    public async Task<bool> AssignUserTaskAsync(int taskId, int userAssignedID)
    {        
        var task = await _repo.GetByIdAsync(taskId);        
        if (task is null)
        {
            throw ServiceException.NotFound();
        }

        var user = await _userRepo.GetById(userAssignedID);        
        if (user is null)
        {
            throw ServiceException.NotFound("User Id not found");
        }        
        var project = await _claimsService.IsProjectExist(task.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        task.Users.Add(user);
        await _repo.UpdateOneAsync(task);
        return true;
    }

    public async Task<bool> RemoveUserTaskAsync(int taskId, int userAssignedID)
    {
        var task = await _repo.GetByIdAsync(taskId);
        if (task is null)
        {
            throw ServiceException.NotFound();
        }

        var user = await _userRepo.GetById(userAssignedID);
        if (user is null)
        {
            throw ServiceException.NotFound("User Id not found");
        }

        var project = await _claimsService.IsProjectExist(task.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        task.Users.Remove(user);
        await _repo.UpdateOneAsync(task);
        return true;
    }

    public override async Task<TaskReadDTO> UpdateOneAsync(int taskId, TaskUpdateDTO update)
    {
        var task = await _repo.GetByIdAsync(taskId);
        if (task is null)
        {
            throw ServiceException.NotFound();
        }
        var project = await _claimsService.IsProjectExist(task.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);
        
        var result = await _repo.UpdateOneAsync(_mapper.Map<TaskUpdateDTO, TaskList>(update, task));
        return _mapper.Map<TaskList, TaskReadDTO>(result);
    }

    public override async Task<bool> DeleteOneAsync(int id)
    {
        var task = await _repo.GetByIdAsync(id);
        if(task is null)
        {
            throw ServiceException.NotFound();
        }

        var project = await _claimsService.IsProjectExist(task.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        return await _repo.DeleteOneAsync(task);
    }

    public async Task<bool> AddComment(int id, CommentCreateDTO request)
    {
        var task = await _repo.GetByIdAsync(id);
        if(task is null)
        {
            throw ServiceException.NotFound();
        }

        var project = await _claimsService.IsProjectExist(task.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);
        
        var comment = _mapper.Map<CommentCreateDTO, Comment>(request);
        comment.TaskId = id;
        comment.UserId = _claimsService.GetUserId();
        await _commentRepo.CreateOneAsync(comment);    
        return true;        
    }
}