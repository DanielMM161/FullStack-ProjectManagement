namespace backend.Controllers;

using backend.DTOs.Request;
using backend.Models;
using backend.DTOs.Response;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// [Authorize]
public class ProjectController : CrudController<Project, ProjectRequest>
{
    private readonly ILogger<ProjectController> _logger;
    private readonly IProjectService _service;

    public ProjectController(ILogger<ProjectController> logger, IProjectService service) : base(service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("user/{userId:int}")]
    public async Task<ICollection<ProjectResponse>?> GetProjectsByUser(int userId)
    {
        var items = await _service.GetProjectsByUserAsync(userId);
        return items
            .Select(p => ProjectResponse.FromProject(p))
            .ToList();
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