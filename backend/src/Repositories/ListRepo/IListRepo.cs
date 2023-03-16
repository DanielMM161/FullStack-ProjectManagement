namespace backend.src.Repositories.ListRepo;

using backend.src.Models;
using backend.src.Repositories.BaseRepo;

public interface IListRepo : IBaseRepo<List>
{
    Task<ICollection<List>> GetListByProjectAsync(int projectId);
}