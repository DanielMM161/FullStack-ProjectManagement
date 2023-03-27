namespace backend.src.Controllers;

using backend.src.DTOs.List;
using backend.src.Models;
using backend.src.Services.ListService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class ListController : BaseController<List, ListReadDTO, ListCreateDTO, ListUpdateDTO>
{
    private readonly IListService _service;    

    public ListController(IListService service) : base(service)
    {
        _service = service;        
    }

    [HttpGet("project/{projectId:int}")]
    public async Task<ICollection<ListReadDTO>> GetListByProject(int projectId)
    {
        return await _service.GetListByProjectAsync(projectId);
    }
}