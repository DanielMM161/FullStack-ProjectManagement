namespace backend.Controllers;

using backend.DTOs.Request;
using backend.Models;
using backend.DTOs.Response;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// [Authorize]
public class ProjectController : ApiControllerBase
{
    private readonly IProjectService _service;
    private readonly ILogger<ProjectController> _logger;

    public ProjectController(ILogger<ProjectController> logger, IProjectService service)
    {
        _logger = logger;
        _service = service;
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

    [HttpDelete("{projectId:int}")]
    public async Task<ActionResult> Delete(int projectId)
    {
        if (await _service.DeleteAsync(projectId))
        {
            return Ok(true);
        }
        return NotFound("Item is not found");
    }

    [HttpPost("add-user")]
    public async Task<bool> AddUser(ProjectUserRequest request)
    {
        return await _service.AddUserAsync(request.ProjectId, request.UsersId);
    }

    [HttpPost("remove-user")]
    public async Task<bool> RemoveUser(ProjectUserRequest request)
    {
        return await _service.RemoveUserAsync(request.ProjectId, request.UsersId);
    }
}