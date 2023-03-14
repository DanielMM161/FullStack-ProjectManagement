namespace backend.Controllers;

using backend.DTOs.Request;
using backend.DTOs.Response.List;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

public class ListController : ApiControllerBase
{
    private readonly IListService _service;
    private readonly IHelpserService _helperService;

    public ListController(IListService service, IHelpserService helperService)
    {
        _service = service ?? throw new ArgumentNullException(nameof(service));
        _helperService = helperService;
    }

    [HttpPost]
    public async Task<ActionResult<List?>> CreateList(ListRequest request)
    {
        var list = await _service.CreateListAsync(request);
        if (list is null)
        {
            return BadRequest("The projectId doesn't exist");
        }
        return Ok(list);
    }

    [HttpGet("project/{projectId:int}")]
    public async Task<ICollection<ListByProjectResponse>> GetListByProject(int projectId)
    {
        var lists = await _service.GetListByProjectAsync(projectId);
        return lists.Select(l => ListByProjectResponse.FromList(l)).ToList();
    }

    [HttpPut("{listId:int}/project/{projectId:int}")]
    public async Task<ActionResult<List>> UpdateList(int listId, int projectId, UpdateListRequest request)
    {
        var list = await _helperService.CheckListBelongProject(listId, projectId);
        if (list is null)
        {
            return BadRequest("List must belong to the project or List not found");
        }
        list = await _service.Update(list, request.Title);
        return Ok(list);
    }

    [HttpDelete("{listId:int}/project/{projectId:int}")]
    public async Task<ActionResult> DeleteList(int listId, int projectId)
    {
        var list = await _helperService.CheckListBelongProject(listId, projectId);
        if (list is null)
        {
            return BadRequest("List must belong to the project or List not found");
        }
        
        await _service.Delete(list);
        return Ok(true);
    }
}