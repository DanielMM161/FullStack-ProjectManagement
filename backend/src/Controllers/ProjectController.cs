namespace backend.src.Controllers;

using System.Security.Claims;
using backend.src.DTOs.Project;
using backend.src.Services.ProjectService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.src.Models;

//[Authorize]
public class ProjectController : BaseController<Project, ProjectReadDTO, ProjectCreateDTO, ProjectUpdateDTO>
{
    private readonly IProjectService _service;    
    private readonly ILogger<ProjectController> _logger;

    public ProjectController(ILogger<ProjectController> logger, IProjectService service) : base(service)
    {
        _service = service ?? throw new ArgumentNullException(nameof(service));       
        _logger = logger;
    }

    [HttpGet("user/{userId:int}")]
    public async Task<ActionResult<ICollection<ProjectReadDTO>?>> GetProjectsByUser(int userId, [FromQuery] int page = 1, [FromQuery]  int pageSize = 20)
    {        
        return Ok(await _service.GetProjectsByUserAsync(userId, page, pageSize));
    }

    [HttpPatch("{projectId:int}/add-user")]
    public async Task<bool> AddUser(int projectId, ProjectUserDTO request)
    {
        return await _service.AddUserAsync(projectId, request.UsersId);
    }

    [HttpPatch("{projectId:int}/remove-user")]
    public async Task<bool> RemoveUser(int projectId, ProjectUserDTO request)
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