namespace backend.src.Services.ListService;

using AutoMapper;
using backend.src.DTOs.List;
using backend.src.Models;
using backend.src.Repositories.ListRepo;
using backend.src.Services.BaseService;

public class ListService : BaseService<List, ListReadDTO, ListCreateDTO, ListUpdateDTO>, IListService
{
    private readonly IListRepo _repo;

    public ListService(IMapper mapper, IListRepo repo) : base(mapper, repo)
    {
        _repo = repo;
    }

    public async Task<ICollection<ListReadDTO>> GetListByProjectAsync(int projectId)
    {
        var lists = await _repo.GetListByProjectAsync(projectId);
        return _mapper.Map<ICollection<List>, ICollection<ListReadDTO>>(lists);
    }

    public override async Task<ListReadDTO?> UpdateOneAsync(int id, ListUpdateDTO update)
    {
        var entity = await _repo.GetByIdAsync(id);
        if(entity is null)
        {
            return null;
        }

        var result = await _repo.UpdateOneAsync(id, _mapper.Map<ListUpdateDTO, List>(update, entity));
        return _mapper.Map<List, ListReadDTO>(result);        
    }
}