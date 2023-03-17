namespace backend.src.Services.ListService;

using System.Security.Claims;
using AutoMapper;
using backend.src.DTOs.List;
using backend.src.Helpers;
using backend.src.Models;
using backend.src.Repositories.ListRepo;
using backend.src.Repositories.ProjectRepo;
using backend.src.Services.BaseService;
using Microsoft.AspNetCore.Authorization;

public class ListService : BaseService<List, ListReadDTO, ListCreateDTO, ListUpdateDTO>, IListService
{
    private readonly IListRepo _repo;
    private readonly IProjectRepo _projectRepo;
    private readonly IAuthorizationService _authService;
    private readonly ClaimsPrincipal _user;

    public ListService(IMapper mapper, 
                        IListRepo repo, 
                        IProjectRepo projectRepo,
                        IAuthorizationService authService,
                        ClaimsPrincipal user) : base(mapper, repo)
    {
        _repo = repo;
        _projectRepo = projectRepo;
        _authService = authService;
        _user = user;
    }

    // public override Task<ListReadDTO> CreateOneAsync(ListCreateDTO request)
    // {
    //     var project = _projectRepo.GetByIdAsync(request.ProjectId);
    //     if (project is null)
    //     {
    //         throw ServiceException.NotFound("Project id is not found");
    //     }

    // }

    public async Task<ICollection<ListReadDTO>> GetListByProjectAsync(int projectId)
    {
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

        var result = await _repo.UpdateOneAsync(id, _mapper.Map<ListUpdateDTO, List>(update, list));
        return _mapper.Map<List, ListReadDTO>(result);        
    }
}