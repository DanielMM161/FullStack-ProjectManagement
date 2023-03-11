using backend.DTOs.Request;
using backend.Models;

namespace backend.Services.Interfaces;

public interface IListService
{
    Task<List?> CreateListAsync(ListRequest request);
    Task<ICollection<List>> GetListByProjectAsync(int projectId);
    Task<List?> Update(int listId, string title);
    Task<bool> Delete(int listId);
}