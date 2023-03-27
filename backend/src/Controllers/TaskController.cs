namespace backend.src.Controllers;

using backend.src.DTOs.Request.Tasks;
using backend.src.DTOs.SubTask;
using backend.src.DTOs.Task;
using backend.src.Models;
using backend.src.Services.SubTaskService;
using backend.src.Services.TaskService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class TaskController : BaseController<TaskList, TaskReadDTO, TaskCreateDTO, TaskUpdateDTO>
{
    private readonly ITaskService _service;
    private readonly ISubTaskService _subTaskService;    

    public TaskController(ITaskService service, ISubTaskService subTaskService) : base(service)
    {
        _service = service;
        _subTaskService = subTaskService;        
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
        return Ok(await _subTaskService.CreateSubTask(taskParentId, request));
    }

    [HttpPatch("{taskParentId:int}/subtask/{subtaskId:int}")]
    public async Task<IActionResult> PatchSubTask(int taskParentId, int subtaskId, SubTaskUpdateDTO request )
    {       
        return Ok(await _subTaskService.UpdateSubTask(taskParentId, subtaskId, request));
    }
}