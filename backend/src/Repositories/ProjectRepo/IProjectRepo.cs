namespace backend.src.Repositories.ProjectRepo;

using backend.src.Repositories.BaseRepo;
using backend.src.Models;

public interface IProjectRepo : IBaseRepo<Project>
{
    Task<ICollection<Project>> GetProjectsByUserAsync(int userId, int page, int pageSize);
}