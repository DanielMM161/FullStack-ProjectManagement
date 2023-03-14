namespace backend.Controllers;

using backend.DTOs.Request.Tasks;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

public class TaskController : ApiControllerBase
{
    private readonly ITaskService _service;
    private readonly ILogger<TaskController> _logger;

    public TaskController(ITaskService service, ILogger<TaskController> logger)
    {
        _service = service ?? throw new ArgumentNullException(nameof(service));
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Create(TaskRequest request)
    {
        var list = await _service.CheckListAsync(request.ListId);
        if (list is null)
        {
            return BadRequest("The listId doesn't exist");
        }

        var user = await _service.CheckCreatedByAsync(request.CreatedById);
        if (user is null)
        {
            return BadRequest("The Id about creator doesn't exist");
        }

        var item = await _service.CreateAsync(request, list, user);
        if (item is null)
        {
            return BadRequest();
        }
        return Ok(item);
    }

    [HttpPut("{taskId:int}")]
    public async Task<IActionResult> Update(int taskId, TaskUpdateRequest request)
    {
        var item = await _service.UpdateAsync(taskId, request);
        if (item is null)
        {
            return NotFound("Item not found");
        }
        return Ok(item);
    }

    [HttpPost("{taskId:int}/assign-user")]
    public async Task<IActionResult> AssignUser(int taskId, AssignTaskRequest request)
    {
        var user = await _service.CheckUserBelongProject(request.UserId, request.ProjectId);
        if (user is null)
        {
            return BadRequest("The User must belong to the Project");
        }

        var isAssigned = await _service.AssignUserTaskAsync(taskId, user);
        if (!isAssigned)
        {
            return NotFound("Item not found");
        }
        return Ok(true);
    }

    [HttpDelete("{taskId:int}/remove-user")]
    public async Task<IActionResult> RemoveUser(int taskId, AssignTaskRequest request)
    {
        var user = await _service.CheckUserBelongProject(request.UserId, request.ProjectId);
        if (user is null)
        {
            return BadRequest("The User must belong to the Project");
        }

        var isRemoved = await _service.RemoveUserTaskAsync(taskId, user);
        if (!isRemoved)
        {
            return NotFound("Item not found");
        }
        return Ok(true);
    }

    [HttpPost("{taskParentId:int}/subtask")]
    public async Task<IActionResult> AddSubTask(int taskParentId, SubTaskRequest request)
    {
        var subTask = await _service.CreateSubTask(taskParentId, request);
        if (subTask is null)
        {
            return BadRequest("Not Possible to create a subtask of a subtask");
        }
        return Ok(subTask);
    }

    [HttpDelete("{taskParentId:int}/subtask/{subtaskId:int}")]
    public async Task<IActionResult> RemoveSubTask(int taskParentId, int subtaskId)
    {
        var isRemoved = await _service.RemoveSubTask(taskParentId, subtaskId);
        if (!isRemoved)
        {
            return BadRequest("SubTask not found or parent Id is not the parent of subtask");
        }
        return Ok(true);
    }

    [HttpPatch("{taskParentId:int}/subtask/{subtaskId:int}")]
    public async Task<IActionResult> PatchSubTask(int taskParentId, int subtaskId, PatchSubTaskRequest request )
    {
        var subTask = await _service.PatchSubTask(taskParentId, subtaskId, request);
        if (subTask is null)
        {
            return BadRequest("SubTask not found or parent Id is not the parent of subtask");
        }
        return Ok(subTask);
    }
}