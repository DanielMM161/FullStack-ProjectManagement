namespace backend.Services.Interfaces;

using backend.Models;
using backend.DTOs.Request;
using backend.DTOs.Response;

public interface IProjectService : ICrudService<Project, ProjectRequest>
{
    Task<bool> AddUserAsync(int projectId, ICollection<int> usersId);
    Task<bool> RemoveUserAsync(int projectId, ICollection<int> usersId);
    Task<ICollection<Project>?> GetProjectsByUserAsync(int userId);
}