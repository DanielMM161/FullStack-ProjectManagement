namespace backend.src.Services.ListService;

using backend.src.DTOs.List;
using backend.src.Models;
using backend.src.Services.BaseService;

public interface IListService : IBaseService<List, ListReadDTO, ListCreateDTO, ListUpdateDTO>
{
    Task<ICollection<ListReadDTO>> GetListByProjectAsync(int projectId);
}