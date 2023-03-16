namespace backend.src.Controllers;

using backend.src.DTOs.Request.Tasks;
using backend.src.DTOs.SubTask;
using backend.src.DTOs.Task;
using backend.src.Models;
using backend.src.Services.SubTaskService;
using backend.src.Services.TaskService.cs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

//[Authorize]
public class TaskController : BaseController<TaskList, TaskReadDTO, TaskCreateDTO, TaskUpdateDTO>
{
    private readonly ITaskService _service;
    private readonly ISubTaskService _subTaskService;
        
    private readonly ILogger<TaskController> _logger;

    public TaskController(ILogger<TaskController> logger, ITaskService service, ISubTaskService subTaskService) : base(service)
    {
        _service = service ?? throw new ArgumentNullException(nameof(service));
        _subTaskService = subTaskService ?? throw new ArgumentNullException(nameof(service));
        _logger = logger;
    }

    [HttpPatch("{taskId:int}/assign-user")]
    public async Task<bool> AssignUser(int taskId, AssignTaskRequest request)
    {
        return await _service.AssignUserTaskAsync(taskId, request.UserId);
    }

    [HttpPatch("{taskId:int}/remove-user")]
    public async Task<bool> RemoveUser(int taskId, AssignTaskRequest request)
    {
        return await _service.RemoveUserTaskAsync(taskId, request.UserId);
    }

    [HttpPost("{taskParentId:int}/subtask")]
    public async Task<IActionResult> AddSubTask(int taskParentId, SubTaskCreateDTO request)
    {
        var subTask = await _subTaskService.CreateSubTask(taskParentId, request);
        if (subTask is null)
        {
            return BadRequest();
        }
        return Ok(subTask);
    }

    [HttpPatch("{taskParentId:int}/subtask/{subtaskId:int}")]
    public async Task<IActionResult> PatchSubTask(int taskParentId, int subtaskId, SubTaskUpdateDTO request )
    {       
        var subTask = await _subTaskService.UpdateOneAsync(subtaskId, request);
        if (subTask is null)
        {
            return BadRequest("SubTask not found or parent Id is not the parent of subtask");
        }
        return Ok(subTask);
    }
}