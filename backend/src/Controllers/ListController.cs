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
    private readonly ILogger<ProjectController> _logger;

    public ListController(ILogger<ProjectController> logger, IListService service) : base(service)
    {
        _service = service ?? throw new ArgumentNullException(nameof(service));
        _logger = logger;
    }

    [HttpGet("project/{projectId:int}")]
    public async Task<ICollection<ListReadDTO>> GetListByProject(int projectId)
    {
        return await _service.GetListByProjectAsync(projectId);
    }
}