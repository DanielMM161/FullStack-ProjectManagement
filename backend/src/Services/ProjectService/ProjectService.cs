namespace backend.src.Services.ProjectService;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.src.DTOs.Project;
using backend.src.Models;
using backend.src.Repositories.ProjectRepo;
using backend.src.Repositories.UserRepo;
using backend.src.Services.BaseService;

public class ProjectService : BaseService<Project, ProjectReadDTO, ProjectCreateDTO, ProjectUpdateDTO>, IProjectService
{
    private readonly IProjectRepo _repo;
    private readonly IUserRepo _userRepo;
    //private readonly HttpContext _context;

    public ProjectService(IMapper mapper, IProjectRepo repo, IUserRepo userRepo) : base(mapper, repo)
    {
        _repo = repo;
        _userRepo = userRepo;        
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

    public async Task<ICollection<ProjectReadDTO>> GetProjectsByUserAsync(int userId, int page, int pageSize)
    {
        var projectResult = await _repo.GetProjectsByUserAsync(userId, page, pageSize);
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
            return false;
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
            return false;
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