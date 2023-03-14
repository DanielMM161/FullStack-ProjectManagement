namespace backend.Controllers;

using System.Security.Claims;
using backend.DTOs.Request.Project;
using backend.DTOs.Response.Project;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class ProjectController : ApiControllerBase
{
    private readonly IProjectService _service;
    private readonly IHelpserService _helperService;
    private readonly ILogger<ProjectController> _logger;

    public ProjectController(ILogger<ProjectController> logger, IProjectService service, IHelpserService helperService)
    {
        _logger = logger;
        _service = service;
        _helperService = helperService;
    }

    [HttpGet("user/{userId:int}")]
    public async Task<ActionResult<ICollection<ProjectResponse>?>> GetProjectsByUser(int userId, [FromQuery] int page = 1, [FromQuery]  int pageSize = 20)
    {
        var items = await _service.GetProjectsByUserAsync(userId, page, pageSize);
        if (items is null)
        {
            return NotFound("Item not found");
        }

        var projects = items
            .Select(p => ProjectResponse.FromProject(p))
            .ToList();
        
        return Ok(projects);
    }

    [HttpGet("{projectId:int}")]
    public async Task<IActionResult> Get(int projectId)
    {
        var project = await _helperService.CheckProject(projectId);
        if (project is null)
        {
            return BadRequest("The Project Don't Exist");
        }
        
        var isBelongProject = await _helperService.CheckUserBelongProject(GetUserIdFromToken(), project);
        if(isBelongProject == -1)
        {
            return BadRequest("The User Must Belong To The Project");
        }        

        return Ok(ProjectByIdResponse.FromProject(project));
    }

    [HttpPost]
    public async Task<IActionResult> Create(ProjectRequest request)
    {
        var project = await _service.CreateAsync(request);
        if (project is null)
        {
            return BadRequest();
        }
        return Ok(ProjectResponse.FromProject(project));
    }

    [HttpDelete("{projectId:int}")]
    public async Task<ActionResult> Delete(int projectId)
    {
        if (await _service.DeleteAsync(projectId))
        {
            return Ok(true);
        }
        return NotFound("Item not found");
    }

    [HttpPost("{projectId:int}/add-user")]
    public async Task<bool> AddUser(int projectId, ProjectUserRequest request)
    {
        return await _service.AddUserAsync(projectId, request.UsersId);
    }

    [HttpPost("{projectId:int}/remove-user")]
    public async Task<bool> RemoveUser(int projectId, ProjectUserRequest request)
    {
        return await _service.RemoveUserAsync(projectId, request.UsersId);
    }

    private int GetUserIdFromToken()
    {
        // Get User Id From JWT Token
        var claim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
        return Convert.ToInt32(claim != null ? claim.Value : "-1");
    }
}