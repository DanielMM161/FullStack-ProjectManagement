namespace backend.src.Controllers;

using backend.src.DTOs.Project;
using backend.src.Services.ProjectService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.src.Models;

[Authorize]
public class ProjectController : BaseController<Project, ProjectReadDTO, ProjectCreateDTO, ProjectUpdateDTO>
{ 
    private readonly IProjectService _service;        

    public ProjectController(IProjectService service) : base(service)
    {
        _service = service;                
    }

    [HttpGet("user")]
    public async Task<ActionResult<ICollection<ProjectReadDTO>?>> GetProjectsByUser([FromQuery] int page = 1, [FromQuery]  int pageSize = 20)
    {        
        return Ok(await _service.GetProjectsByUserAsync(page, pageSize));
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
}