namespace backend.Services.Interfaces;

using backend.Models;
using backend.DTOs.Request.Project;
using backend.DTOs.Response;

public interface IProjectService : ICrudService<Project, ProjectRequest>
{
    Task<ICollection<Project>> GetProjectsByUserAsync(int userId, int page, int pageSize);
    Task<bool> AddUserAsync(int projectId, ICollection<int> usersId);
    Task<bool> RemoveUserAsync(int projectId, ICollection<int> usersId);
}