namespace backend.src.Services.ListService;

using AutoMapper;
using backend.src.DTOs.List;
using backend.src.Helpers;
using backend.src.Models;
using backend.src.Repositories.ListRepo;
using backend.src.Repositories.ProjectRepo;
using backend.src.Services.BaseService;

public class ListService : BaseService<List, ListReadDTO, ListCreateDTO, ListUpdateDTO>, IListService
{
    private readonly IListRepo _repo;
    private readonly IProjectRepo _projectRepo;
    private readonly IClaimsPrincipalService _claimsService;

    public ListService(IMapper mapper, 
                        IListRepo repo, 
                        IProjectRepo projectRepo,
                        IClaimsPrincipalService claimsService) : base(mapper, repo)
    {
        _repo = repo;
        _projectRepo = projectRepo;
        _claimsService = claimsService;
    }

    public override async Task<ListReadDTO> CreateOneAsync(ListCreateDTO request)
    {
        var project = await _claimsService.IsProjectExist(request.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        return await base.CreateOneAsync(request);
    }

    public async Task<ICollection<ListReadDTO>> GetListByProjectAsync(int projectId)
    {
        var project = await _claimsService.IsProjectExist(projectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        var lists = await _repo.GetListByProjectAsync(projectId);
        return _mapper.Map<ICollection<List>, ICollection<ListReadDTO>>(lists);
    }

    public override async Task<ListReadDTO?> UpdateOneAsync(int id, ListUpdateDTO update)
    {
        var list = await _repo.GetByIdAsync(id);
        if(list is null)
        {
            throw ServiceException.NotFound();
        }

        var project = await _claimsService.IsProjectExist(list.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        var result = await _repo.UpdateOneAsync(_mapper.Map<ListUpdateDTO, List>(update, list));
        return _mapper.Map<List, ListReadDTO>(result);        
    }

    public override async Task<bool> DeleteOneAsync(int id)
    {
        var list = await _repo.GetByIdAsync(id);
        if(list is null)
        {
            throw ServiceException.NotFound();
        }

        var project = await _claimsService.IsProjectExist(list.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        return await _repo.DeleteOneAsync(list);
    }

    public override async Task<ListReadDTO?> GetByIdAsync(int id)
    {
        var list = await _repo.GetByIdAsync(id);
        if (list is null)
        {
            throw ServiceException.NotFound();
        }

        var project = await _claimsService.IsProjectExist(list.ProjectId, _projectRepo);
        await _claimsService.CheckUserBelongProject(project);

        return _mapper.Map<List, ListReadDTO>(list);
    }
}