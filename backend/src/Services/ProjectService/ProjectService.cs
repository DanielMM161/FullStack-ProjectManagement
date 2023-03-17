namespace backend.src.Services.ProjectService;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.src.DTOs.Project;
using backend.src.Models;
using backend.src.Repositories.ProjectRepo;
using backend.src.Repositories.UserRepo;
using backend.src.Services.BaseService;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using backend.src.Helpers;

public class ProjectService : BaseService<Project, ProjectReadDTO, ProjectCreateDTO, ProjectUpdateDTO>, IProjectService
{
    private readonly IAuthorizationService _authService;
    private readonly IServiceUserFromToken _userService;
    private readonly IProjectRepo _repo;
    private readonly IUserRepo _userRepo;

    public ProjectService(IMapper mapper, 
                            IProjectRepo repo,
                            IUserRepo userRepo, 
                            IAuthorizationService authService, 
                            IServiceUserFromToken userService) : base(mapper, repo)
    {
        _repo = repo;
        _userRepo = userRepo;
        _authService = authService;
        _userService = userService;
    }

    public override async Task<ProjectReadDTO> CreateOneAsync(ProjectCreateDTO request)
    {
        List<User> users = new List<User>();
        foreach (var id in request.UsersId)
        {
            var user = await _userRepo.GetById(id);
            if(user != null) users.Add(user);
        }

        var project = new Project
        {
            Name = request.Name,
            Description = request.Description,
            Users = users
        };
        
        await _repo.CreateOneAsync(project);
        var item = _mapper.Map<Project, ProjectReadDTO>(project);
        return item;
    }

    public async Task<ICollection<ProjectReadDTO>> GetProjectsByUserAsync(int page, int pageSize)
    {
        var projectResult = await _repo.GetProjectsByUserAsync(_userService.GetUserId(), page, pageSize);
        return _mapper.Map<ICollection<Project>, ICollection<ProjectReadDTO>>(projectResult);        
    }

    public async Task<ProjectReadDTO> UpdateOneAsync(int id, ProjectUpdateDTO update)
    {
        return await base.UpdateOneAsync(id, update);
    }

    public async Task<bool> AddUserAsync(int projectId, ICollection<int> usersId)
    {
        var project = await _repo.GetByIdAsync(projectId);
        if (project is null)
        {
            throw ServiceException.NotFound();
        }

        
        var authorization = await _authService.AuthorizeAsync(_userService.GetClaim(), project, "Belong");
        if (!authorization.Succeeded)
        {
            throw ServiceException.Unauthorized("You must belong to the Project");
        }
        
        foreach (var id in usersId)
        {
            var user = await _userRepo.GetById(id);
            if (user is not null && !project.Users.Contains(user))
            {
                project.Users.Add(user);
            }            
        }

        return await _repo.UpdateOneAsync(projectId, project) is not null ? true : false;
    }

    public async Task<bool> RemoveUserAsync(int projectId, ICollection<int> usersId)
    {
        var project = await _repo.GetByIdAsync(projectId);
        if (project is null)
        {
            throw ServiceException.NotFound();
        }

        var authorization = await _authService.AuthorizeAsync(_userService.GetClaim(), project, "Belong");
        if (!authorization.Succeeded)
        {
            throw ServiceException.Unauthorized("You must belong to the Project");
        }
        
        foreach (var id in usersId)
        {
            var user = await _userRepo.GetById(id);
            if (user is not null && project.Users.Contains(user))
            {
                project.Users.Remove(user);
            }            
        }
        
        return await _repo.UpdateOneAsync(projectId, project) is not null ? true : false;
    }
}