namespace backend.src.Services.ProjectService;

using backend.src.Services.BaseService;
using backend.src.Models;
using backend.src.DTOs.Project;

public interface IProjectService : IBaseService<Project, ProjectReadDTO, ProjectCreateDTO, ProjectUpdateDTO>
{
    Task<ICollection<ProjectReadDTO>> GetProjectsByUserAsync(int userId, int page, int pageSize);
    Task<bool> AddUserAsync(int projectId, ICollection<int> usersId);
    Task<bool> RemoveUserAsync(int projectId, ICollection<int> usersId);
}